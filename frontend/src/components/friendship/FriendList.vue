<template>
  <section>
    <header>
      <div>나의 친구 목록👨🏾‍🤝‍👨🏼</div>
      <div id="goToGroupCreate" @click="$router.push('group/create')">그룹 생성하기</div>
    </header>
    <article v-if="loaded">
      <div v-for="(friend, index) in friends" :key="index">
        <div class="row">
          <div class="left">
            <img :src="friend.profile_img ? friend.profile_img : require('@/assets/image/profile_basic.png')" />
          </div>
          <div class="right">
            <div>
              <div>{{ friend.username }}</div>
              <div>{{ friend.status_msg ? friend.status_msg : '안녕하세요' }}</div>
            </div>

            <i class="fas fa-times" @click="deleteConfirm(index)"></i>
          </div>
        </div>
      </div>
    </article>
    <yes-or-no-modal
      msg1="정말로 삭제하시겠습니까?"
      msg2="삭제가 완료되었습니다!"
      @close="modalToggle(false)"
      @ok="fDelete"
      v-show="modalOpen"
    ></yes-or-no-modal>
  </section>
</template>

<script>
import { friendList, friendDelete } from '@/api/friend';
import YesOrNoModal from '@/components/common/YesOrNoModal';
export default {
  components: { YesOrNoModal },
  data() {
    return {
      friends: [],
      loaded: false,
      modalOpen: false,
      target: 0,
    };
  },
  methods: {
    deleteConfirm(index) {
      this.target = index;
      this.modalToggle(true);
    },
    modalToggle(bool) {
      this.modalOpen = bool;
    },
    fDelete() {
      const target = this.target;
      friendDelete(this.friends[target].id);
      this.friends.splice(target, 1);
    },
  },
  async created() {
    try {
      const { data } = await friendList(this.$store.state.id);
      this.friends = data.friends;
      this.loaded = true;
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/friendship/FriendList';
span#goToGroupCreate {
  color: rgb(56, 56, 206);
  cursor: pointer;
  margin-top: 10px;
}
</style>
