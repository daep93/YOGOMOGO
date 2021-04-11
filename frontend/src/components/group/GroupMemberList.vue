<template>
  <section class="member--list--container">
    <header ref="header">
      함께 식사할 친구 🍟
    </header>
    <article v-if="loaded">
      <div v-for="(friend, index) in friends" :key="index" class="friend--profile--wrapper ">
        <div>
          <img
            :src="friend.profile_img ? friend.profile_img : require('@/assets/image/profile_basic.png')"
            @click="toggleMember(index)"
            :class="{ active: friend['selected'] }"
          />
        </div>
        <div>{{ friend.username }}</div>
      </div>
    </article>
    <div class="btn--update" v-if="isUpdate">
      <div @click="$emit('clickDeleteBtn')">Delete</div>
      <div @click="$emit('clickSaveBtn')">Update</div>
    </div>
    <div class="btn--save" @click="$emit('clickSaveBtn')" v-else>
      SAVE
    </div>
  </section>
</template>

<script>
import { friendList } from '@/api/friend';
export default {
  props: {
    exMembers: {
      type: Array,
    },
    isUpdate: {
      type: Boolean,
    },
  },
  data() {
    return {
      friends: [],
      loaded: false,
    };
  },
  methods: {
    toggleMember(index) {
      // 멤버를 추가하거나 삭제하는 경우
      if (this.friends[index]['selected']) this.$emit('sub', this.friends[index].id);
      else this.$emit('add', this.friends[index].id);

      // selected 여부 변경
      this.friends[index]['selected'] = !this.friends[index]['selected'];
      this.friends = { ...this.friends };
    },
  },
  async created() {
    try {
      const { data } = await friendList(this.$store.state.id);
      if (data.friends.length == 0) {
        alert('아직 등록된 친구가 없습니다.');
        this.$router.push({ name: 'Friendship' });
      }
      const exMembers = this.exMembers;
      if (this.exMembers.length) {
        this.friends = data.friends.map(el => {
          el['selected'] = exMembers.indexOf(el.id) >= 0 ? true : false;
          return el;
        });
      } else {
        this.friends = data.friends;
      }
      this.loaded = true;
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/group/GroupMemberList';
</style>
