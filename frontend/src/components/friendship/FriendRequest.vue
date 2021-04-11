<template>
  <section>
    <div class="title">친구 요청하기💌</div>
    <article>
      <header>
        <input v-model="word" type="text" @keypress.enter="search" />
        <div @click="search">
          <i class="fas fa-search"></i>
        </div>
      </header>
      <div class="list" v-if="loaded">
        <!-- TODO: searchList에 친구인 사람들을 제외시켜줘야 함 -->
        <div v-for="(el, index) in searchList" :key="index" class="user--wrapper">
          <div>
            <img :src="el.profile_img ? el.profile_img : require('@/assets/image/profile_basic.png')" />
          </div>
          <div>{{ el.username }}</div>
          <div class="btn--request" @click="requestTo(index, el.id)" :ref="`btn--request--${index}`">요청하기</div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { usernameSearch } from '@/api/auth';
import { friendRequest } from '@/api/friend';
export default {
  data() {
    return {
      word: '',
      searchList: [],
      loaded: false,
    };
  },
  methods: {
    async requestTo(index, id) {
      try {
        this.$refs[`btn--request--${index}`][0].innerText = '요청완료';
        this.$refs[`btn--request--${index}`][0].classList.add('active');
        await friendRequest({ sendTo: id });
        // this.searchList.splice(index, 1);
      } catch (error) {
        if (error.response.data.response != 'already requested') alert(error);
      }
    },
    async search() {
      const word = this.word;
      if (word == '') return;
      try {
        const { data } = await usernameSearch({
          params: {
            search: word,
          },
        });
        for (let index = 0; index < this.searchList.length; index++) {
          this.$refs[`btn--request--${index}`][0].innerText = '요청하기';
          this.$refs[`btn--request--${index}`][0].classList.remove('active');
        }
        this.searchList = data;
        this.loaded = true;
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/friendship/FriendRequest.scss';
</style>
