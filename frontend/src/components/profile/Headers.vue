<template>
  <div>
    <div class="profile_info">
      <div class="profile_info-container">
        <div class="profile_background-cover">
          <img
            :src="info.profile_img ? info.profile_img : require('@/assets/image/profile_basic.png')"
            class="profile_profile-img"
          />
        </div>
        <div class="profile_username">{{ info.username }}</div>
        <p class="profile_montly-count">리뷰: ?? · 이번달 한 끼: ??</p>
        <p class="profile_bio">{{ info.status_msg }}</p>
        <p>{{ info.region }}</p>
        <button @click="goToFriendList">친구 목록</button>
        <br />
        <div v-if="!info.check && !checkFriendStatus">
          <button class="profile_follow-btn" @click="requestTo(info.userId)">친구 요청</button>
        </div>
        <div v-if="!info.check && checkFriendStatus">
          <button class="profile_follow-btn" @click="deleteFriend(info.userId)">친구 취소</button>
        </div>
        <div v-else-if="!info.check && requestSend">
          <button class="profile_follow-btn">수락 대기중</button>
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import { friendRequest, friendDelete } from '@/api/friend';
export default {
  props: {
    info: Object,
    checkFriendStatus: Boolean,
  },
  data() {
    return {
      requestSend: '',
    };
  },
  methods: {
    deleteFriend(id) {
      friendDelete(id);
    },
    goToFriendList() {
      this.$router.push({ name: 'Friendship' });
    },
    async requestTo(id) {
      try {
        await friendRequest({ sendTo: id });
        this.requestSend = true;
        // location.reload();
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style scoped></style>
