<template>
  <div>
    <!-- 최상단 현재 위치 받기 -->
    <header class="review-feed-page-top-navigation">
      <div class="review-feed-page-map-modal" @click="onModal">
        <i class="fas fa-map-marker-alt"></i>
        {{ addr }}
      </div>
    </header>
    <set-road-name v-show="loaded" @newAddress="setAddress"></set-road-name>
    <div class="review-feed-page-container">
      <!-- 리뷰 페이지 타이틀 -->
      <div class="review-feed-page-title">
        <div class="review-feed-page-main-title">Hello, {{ $store.state.username }}!</div> 
        <p class="review-feed-page-sub-title">다양한 리뷰를 살펴보세요!</p>
      </div>
      <!-- 그룹별 피드 모아보기 -->
      <theme-category></theme-category>
      <!-- 전국 인기 피드 -->
      <hot-feed></hot-feed>
      <!-- 사용자 맞춤 피드 -->
      <feed-for-you></feed-for-you>
    </div>
  </div>
</template>

<script>
import SetRoadName from '@/components/common/SetRoadName';
import ThemeCategory from '@/components/feed/ThemeCategory';
import FeedForYou from '@/components/feed/FeedForYou';
import HotFeed from '@/components/feed/HotFeed';
// import LocationSearchBar from '@/components/feed/LocationSearchBar';
export default {
  components: {
    SetRoadName,
    ThemeCategory,
    HotFeed,
    FeedForYou,
    // LocationSearchBar,
  },
  data() {
    return {
      loaded: false,
      addr: this.$store.state.location,
    }
  },
  methods: {
    onModal() {
      this.loaded = true;
    },
    setAddress(address) {
      if (address) {
        this.addr = address;
      }
      this.loaded = false;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/MainFeedPage.scss';
</style>