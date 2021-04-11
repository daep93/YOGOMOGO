<template>
  <div>
    <!-- 전국 피드 낱개 -->
    <div class="total-hot-feed-all" v-for="(review, index) in this.hotFeedList" :key="index">
      <!-- 식당 평점 -->
      <div class="total-hot-feed-all-score-box">
        <p class="total-hot-feed-all-score-text">😋 {{ review.score }}</p>
      </div>
      <i
        @click="checkbookmarked(index)"
        v-if="!review.bookmarked"
        class="far fa-bookmark fa-lg total-hot-feed-all-bookmark"
      ></i>
      <i @click="checkbookmarked(index)" v-else class="fas fa-bookmark fa-lg total-hot-feed-all-bookmark"></i>
      <figure class="total-hot-feed-all-image" @click="goToDetail(index)">
        <img :src="review.image[0] ? review.image[0] : require('@/assets/image/basic_review.jpg')" alt="review-image" />
      </figure>
      <!-- 피드 상세 정보 -->
      <div class="total-hot-feed-all-info">
        <div class="total-hot-feed-all-info-main">
          <p class="total-hot-feed-all-headcount">{{ review.headcount }}인</p>
          <span class="total-hot-feed-all-title">{{ review.title }}</span>
        </div>
        <!-- 식당명 / 식당 위치 -->
        <div class="total-hot-feed-all-store-info">
          {{ review.restaurant_info.store_name }} / 🚩{{ rename(review.restaurant_info.address) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotFeed, toggleReviewBookmark } from '@/api/review';

export default {
  name: 'swiper-example-centered-slides',
  title: 'Centered slides',
  data() {
    return {
      id: '',
      image: '',
      theme: '',
      title: '',
      score: '',
      headcount: '',
      restaurant_info: Object,
      writer: Object,
      bookmarked: false,
      viewed_num: '',

      hotFeedList: [],
    };
  },
  async created() {
    try {
      const { data } = await getHotFeed();
      this.hotFeedList = data.slice(5);
    } catch (error) {
      alert(error);
      // alert('에러가 발생했습니다.)
    }
  },
  methods: {
    goToDetail(index) {
      const reviewId = this.hotFeedList[index].id;
      this.$router.push(`/group/feed/detail/${reviewId}`);
    },
    rename(address) {
      const arr = address.split(' ');
      return arr[1] + ' ' + arr[2];
    },
    // checkbookmarked(index) {
    //   this.hotFeedList[index].bookmarked = !this.hotFeedList[index].bookmarked
    // },
    // api 연결 version
    async checkbookmarked(index) {
      try {
        await toggleReviewBookmark(this.hotFeedList[index].id);
        this.hotFeedList[index].bookmarked = !this.hotFeedList[index].bookmarked;
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/HotFeedAll.scss';
</style>
