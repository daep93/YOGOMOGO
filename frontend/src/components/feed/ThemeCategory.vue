<template>
  <div>
    <!-- 소제목 -->
    <div class="theme-sub-title">
      테마별 피드 모아보기
    </div>
    <!-- 카테고리 타이틀 -->
    <div class="theme-list">
      <div class="theme-card" @click="goToFamilyPage">
        <p class=theme-card-title>가족👨‍👩‍👧</p>
      </div>
      <div class="theme-card" @click="goToFriendPage">
        <p class=theme-card-title>친구👩🏼‍🤝‍🧑🏿</p>
      </div>
      <div class="theme-card" @click="goToLoverPage">
        <p class=theme-card-title>연인💞</p>
      </div>
      <div class="theme-card" @click="goToMeetupPage">
        <p class=theme-card-title>회식🍱</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToFamilyPage() {
      this.$router.push('/feed/theme/family');
    },
    goToFriendPage() {
      this.$router.push('/feed/theme/friend');
    },
    goToLoverPage() {
      this.$router.push('/feed/theme/lover');
    },
    goToMeetupPage() {
      this.$router.push('/feed/theme/meetup');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/MainFeedThemeCategory.scss';
</style>