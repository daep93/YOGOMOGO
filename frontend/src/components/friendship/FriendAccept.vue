<template>
  <section>
    <div class="title">친구 요청 수락📪</div>
    <article v-if="loaded">
      <div v-for="(request, index) in requests" :key="index">
        <div class="row">
          <div class="left">
            <img :src="request.profile_img ? request.profile_img : require('@/assets/image/profile_basic.png')" />
          </div>
          <div class="right">
            <div>
              <div>{{ request.username }}</div>
              <div>{{ request.status_msg ? request.status_msg : '안녕하세요!' }}</div>
              <div>
                <span @click="accept(true, index)" class="accept">수락하기</span>
                <span @click="accept(false, index)">거절하기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { friendReqList, friendCreate, friendReqDelete } from '@/api/friend';
export default {
  data() {
    return {
      loaded: false,
      requests: [],
    };
  },
  methods: {
    accept(flag, index) {
      const sentFrom = this.requests[index].id;
      if (flag) {
        friendCreate({ friend: sentFrom });
      } else {
        friendReqDelete(sentFrom);
      }
      this.requests.splice(index, 1);
    },
  },
  async created() {
    try {
      const { data } = await friendReqList();
      this.requests = data.requests;
      this.loaded = true;
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/friendship/FriendAccept';
</style>
