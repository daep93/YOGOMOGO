<template>
  <div class="group--edit--container">
    <group-resource
      :exName="name"
      :exImg="img"
      :option="id ? 'update' : 'create'"
      @updateName="setName"
      @updateImg="setImg"
      v-if="loaded"
    ></group-resource>
    <group-member-list
      :isUpdate="id ? true : false"
      :exMembers="selectedMembers"
      @add="addMember"
      @sub="subMember"
      @clickSaveBtn="saveGroup"
      @clickDeleteBtn="modalOpen = true"
      v-if="loaded"
    ></group-member-list>
    <yes-or-no-modal
      msg1="정말로 삭제하시겠습니까?"
      msg2="삭제가 완료되었습니다!"
      @close="modalToggle(false)"
      @ok="deleteGroup"
      v-show="modalOpen"
    ></yes-or-no-modal>
  </div>
</template>

<script>
import GroupResource from '@/components/group/GroupResource';
import GroupMemberList from '@/components/group/GroupMemberList';
import YesOrNoModal from '@/components/common/YesOrNoModal';

import { groupDetail, groupCreate, groupUpdate, groupDelete } from '@/api/group';
import { uploadImg } from '@/api/image';
export default {
  props: {
    id: {
      type: String,
      default: '',
      require: false,
    },
  },
  components: {
    GroupResource,
    GroupMemberList,
    YesOrNoModal,
  },
  data() {
    return {
      name: '',
      img: '',
      file: '',
      members: [],
      selectedMembers: [],
      modalOpen: false,
      loaded: false,
    };
  },
  methods: {
    setName(name) {
      this.name = name;
    },
    setImg(file) {
      this.file = file;
    },
    addMember(id) {
      this.selectedMembers.push(id);
    },
    subMember(id) {
      const pos = this.selectedMembers.indexOf(id);
      this.selectedMembers.splice(pos, 1);
    },
    modalToggle(bool) {
      this.modalOpen = bool;
    },
    async deleteGroup() {
      try {
        await groupDelete(this.id);
        this.$router.push({ name: 'GroupMain' });
      } catch (error) {
        alert(error);
      }
    },
    async saveGroup() {
      if (this.name == '') {
        alert('그룹의 이름을 정해주세요');
        return;
      }

      if (this.file) {
        const frm = new FormData();
        frm.append('image', this.file);
        const { data } = await uploadImg(frm);
        this.img = data.image;
      } else if (!this.img) {
        alert('그룹의 이미지를 정해주세요');
        return;
      }
      if (this.selectedMembers.length <= 0) {
        alert('한 명 이상의 멤버를 선택해주세요.');
        return;
      }

      if (this.id) {
        try {
          await groupUpdate(this.id, {
            name: this.name,
            img: this.img,
            members: this.selectedMembers,
          });
          alert('그룹이 수정되었습니다.');
          this.$router.push({ name: 'GroupMain' });
        } catch (error) {
          alert(error);
        }
      } else {
        try {
          if (!this.name) return;
          await groupCreate({
            name: this.name,
            img: this.img,
            members: this.selectedMembers,
          });
          alert('그룹이 생성되었습니다.');
          this.$router.push({ name: 'GroupMain' });
        } catch (error) {
          alert(error);
        }
      }
    },
  },
  async created() {
    if (this.id) {
      try {
        const { data } = await groupDetail(this.id);
        this.name = data.name;
        this.img = data.img;
        this.members = data.members;
        this.selectedMembers = data.members.map(el => el.id);
        this.loaded = true;
      } catch (error) {
        alert(error);
      }
    } else {
      this.loaded = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.save--line {
  display: flex;
  justify-content: center;
  background-color: black;
}
.btn--create {
  padding: 5px 5px;
  border: 1px solid #bbb;
  border-radius: 3px;
  cursor: pointer;
}
.group--edit--container {
  min-height: 100vh;
}
</style>
