<template>
  <div class="friendship--container">
    <header>
      <div>Find</div>
      <div>Your Friends</div>
      <div>함께 식사할 친구를 찾아볼까요?</div>
    </header>
    <nav>
      <div class="active" ref="request" @click="clickTab(true)">친구 요청</div>
      <div ref="list" @click="clickTab(false)">친구 목록</div>
    </nav>
    <component :is="reqTab ? 'Friendship' : 'FriendList'"></component>
  </div>
</template>

<script>
import FriendList from '@/components/friendship/FriendList';
import Friendship from '@/components/friendship/Friendship';
export default {
  components: {
    FriendList,
    Friendship,
  },
  data() {
    return {
      reqTab: true,
    };
  },
  methods: {
    clickTab(value) {
      if (this.reqTab == value) return;
      this.reqTab = value;
      this.$refs.request.classList.toggle('active');
      this.$refs.list.classList.toggle('active');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/friendship/FriendshipPage';
</style>
