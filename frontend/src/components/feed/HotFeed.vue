<template>
  <div>
    <div class="hot-feed-title-part">
      <p class="hot-feed-sub-title">전국 인기 피드🔥</p>
      <span class="see-all-hot-feed" @click="seeAll">see all</span>
    </div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(review, index) in this.hotFeedList" :key="index">
        <!-- 전국 피드 낱개 -->
        <div class="hot-feed-item">
          <!-- 피드 작성자 정보 -->
          <div class="hot-feed-item-writer-info">
            <img
              :src="review.writer.profile_img ? review.writer.profile_img : require('@/assets/image/basic_profile.jpg')"
              alt="writer-image"
            />
            <span class="hot-feed-item-writer-name">{{ review.writer.username }}</span>
          </div>
          <!-- 식당 평점 -->
          <div class="hot-feed-item-score-box">
            <p class="hot-feed-item-score-text">😋 {{ review.score }}</p>
          </div>
          <!-- 북마크 -->
          <i
            @click="checkbookmarked(index)"
            v-if="!review.bookmarked"
            class="far fa-bookmark fa-lg hot-feed-item-bookmark"
          ></i>
          <i @click="checkbookmarked(index)" v-else class="fas fa-bookmark fa-lg hot-feed-item-bookmark"></i>
          <!-- 이미지 -->
          <figure class="hot-feed-item-image" @click="goToDetail(index)">
            <img
              :src="review.image[0] ? review.image[0] : require('@/assets/image/basic_review.jpg')"
              alt="review-image"
            />
          </figure>
          <!-- 피드 상세 정보 -->
          <div class="hot-feed-item-info">
            <div class="hot-feed-item-info-main">
              <p class="hot-feed-item-headcount">{{ review.headcount }}인</p>
              <span class="hot-feed-item-title">{{ review.title }}</span>
            </div>
            <!-- 식당명 / 식당 위치 -->
            <div class="hot-feed-item-store-info">
              {{ review.restaurant_info.store_name }} / 🚩{{ rename(review.restaurant_info.address) }}
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { getHotFeed, toggleReviewBookmark } from '@/api/review';

export default {
  // name: 'swiper-example-centered-slides',
  // title: 'Centered slides',
  name: 'swiper-example-multiple-slides-per-biew',
  title: 'Multiple slides per view',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.25,
        spaceBetween: 3,
        centeredSlides: true,
        // slidesPerGroup: 1,
      },
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
      this.hotFeedList = data.slice(0, 10);
    } catch (error) {
      alert(error);
      // alert('에러가 발생했습니다.)
    }
  },
  methods: {
    seeAll() {
      this.$router.push({ path: '/feed/hot' });
    },
    goToDetail(index) {
      const reviewId = this.hotFeedList[index].id;
      this.$router.push(`/group/feed/detail/${reviewId}`);
    },
    rename(address) {
      const arr = address.split(' ');
      return arr[1] + ' ' + arr[2];
    },
    // api 연결 version
    async checkbookmarked(index) {
      try {
        await toggleReviewBookmark(this.hotFeedList[index].id);
        this.hotFeedList[index].bookmarked = !this.hotFeedList[index].bookmarked;
      } catch (error) {}
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/MainFeedHotFeed.scss';
</style>
