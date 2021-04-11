<template>
  <div class="total-hot-feed-page">
    <div @click="closeTotalHotFeedPage" class="total-hot-feed-page-close">
      <i class="fas fa-chevron-left fa-lg"></i>
    </div>
    <!-- 타이틀 -->
    <div class="total-hot-feed-page-main-title">
      전국 인기 Review
    </div>
    <div class="total-hot-feed-page-main-title-explain">
      전국의 인기 리뷰만 모아봤어요!
    </div>
    <!-- 인기 Top 5 리뷰 보기 -->
    <div class="total-hot-feed-page-sub-title">
      <p>TOP 5✨</p>
    </div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(review, index) in this.topFiveList" :key="index">
        <div class="total-hot-feed-top-five">
          <img
            class="total-hot-feed-top-five-img"
            @click="goToDetail(index)"
            :src="review.image[0] ? review.image[0] : require('@/assets/image/basic_review.jpg')"
            alt="review image"
          />
          <div class="total-hot-feed-top-five-score-box">
            <p>😋 {{ review.score }}</p>
          </div>
          <!-- 북마크 -->
          <i
            @click="checkbookmarked(index)"
            v-if="!review.bookmarked"
            class="far fa-bookmark fa-2x total-hot-feed-top-five-bookmark"
          ></i>
          <i @click="checkbookmarked(index)" v-else class="fas fa-bookmark fa-2x total-hot-feed-top-five-bookmark"></i>
          <div class="total-hot-feed-top-five-info">
            <div class="total-hot-feed-top-five-headcount">
              <p>{{ review.headcount }}인</p>
            </div>
            <div class="total-hot-feed-top-five-title">
              {{ review.title }}
            </div>
            <div class="total-hot-feed-top-five-restaurant">
              {{ review.restaurant_info.store_name }} / 🚩{{ rename(review.restaurant_info.address) }}
            </div>
            <img
              class="total-hot-feed-top-five-profile"
              :src="review.writer.profile_img ? review.writer.profile_img : require('@/assets/image/basic_profile.jpg')"
              alt="profile image"
            />
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <!-- pagination 적용 -->
    <div class="swiper-pagination"></div>
    <!-- 모든 인기 리뷰 리스트 모아보기-->
    <div class="total-hot-feed-page-sub-title">
      <p>그 외 Reviews✨</p>
    </div>
    <hot-feed-all></hot-feed-all>
  </div>
</template>

<script>
import { getHotFeed, toggleReviewBookmark } from '@/api/review';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import HotFeedAll from '@/components/feed/hot/HotFeedAll';
export default {
  name: 'swiper-example-centered-slides',
  title: 'Centered slides',
  components: {
    Swiper,
    SwiperSlide,
    HotFeedAll,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
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

      topFiveList: [],
    };
  },
  methods: {
    closeTotalHotFeedPage() {
      this.$router.push('/feed');
    },
    goToDetail(index) {
      const reviewId = this.topFiveList[index].id;
      this.$router.push(`/group/feed/detail/${reviewId}`);
    },
    rename(address) {
      const arr = address.split(' ');
      return arr[1] + ' ' + arr[2];
    },
    // checkbookmarked(index) {
    //   this.topFiveList[index].bookmarked = !this.topFiveList[index].bookmarked
    // },
    // TODO
    // api 연결 version
    async checkbookmarked(index) {
      try {
        await toggleReviewBookmark(this.topFiveList[index].id);
        this.topFiveList[index].bookmarked = !this.topFiveList[index].bookmarked;
      } catch (error) {
        alert(error);
      }
    },
  },
  async created() {
    try {
      const { data } = await getHotFeed();
      this.topFiveList = data.slice(0, 5);
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/TotalHotFeedPage.scss';
</style>
