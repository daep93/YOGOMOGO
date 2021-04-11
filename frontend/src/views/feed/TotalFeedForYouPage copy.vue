<template>
  <div>
    <!-- 최상단 현재 위치 받기 -->
    <header class="total-feed-for-you-page-top-navigation" @click="onModal">
      <i class="fas fa-map-marker-alt"></i>
      {{ addr }}
    </header>
    <set-road-name v-show="loaded" @newAddress="setAddress"></set-road-name>
    <div class="total-feed-for-you-page-container">
      <div @click="closeTotalFeedForYouPage" class="total-feed-for-you-page-close">
        <i class="fas fa-chevron-left fa-lg"></i>
      </div>
      <!-- 타이틀 -->
      <div class="total-feed-for-you-page-main-title">
        추천 Review
      </div>
      <div class="total-feed-for-you-page-main-title-explain">
        당신을 위한 추천 리뷰만 모아봤어요!
      </div>
      <!-- 추천 리뷰 개별 -->
      {{ this.feedForYouList.results }}
      <!-- <div v-for="(review, index) in this.feedForYouList.results" :key="index"> -->
      <div v-for="(review, index) in this.data" :key="index">
        <div class="total-feed-for-you-item">
          <img
            class="total-feed-for-you-img"
            @click="goToDetail"
            :src="review.image ? review.image : require('@/assets/image/basic_review.jpg')"
            alt="review image"
          />
          <div class="total-feed-for-you-score-box">
            <p>😋 {{ review.score }}</p>
          </div>
          <!-- 북마크 -->
          <i
            @click="checkbookmarked(review.id)"
            v-if="!review.bookmarked"
            class="far fa-bookmark fa-2x total-feed-for-you-bookmark"
          ></i>
          <i @click="checkbookmarked(review.id)" v-else class="fas fa-bookmark fa-2x total-feed-for-you-bookmark"></i>
          <div class="total-feed-for-you-info">
            <div class="total-feed-for-you-headcount">
              <p>{{ review.headcount }}인</p>
            </div>
            <div class="total-feed-for-you-title">
              {{ review.title }}
            </div>
            <div class="total-feed-for-you-restaurant">
              {{ review.restaurant_info.store_name }} / 🚩{{ review.restaurant_info.address }}
            </div>
            <img
              class="total-feed-for-you-profile"
              :src="review.writer.profile_img ? review.writer.profile_img : require('@/assets/image/basic_profile.jpg')"
              alt="profile image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { testCase } from '@/dummy/TotalHotFeed.js';
import SetRoadName from '@/components/common/SetRoadName';
import { getFeedForYou } from '@/api/review';
export default {
  components: {
    SetRoadName,
  },
  data() {
    return {
      loaded: false,
      addr: this.$store.state.location,
      limit: 10,
      page: 1,

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

      feedForYouList: [],

      // data: testCase
    };
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
    closeTotalFeedForYouPage() {
      this.$router.push('/feed');
    },
    goToDetail() {
      this.$router.push(`/review/detail/${this.id}`);
    },
    checkbookmarked(index) {
      this.data[index - 1].bookmarked = !this.data[index - 1].bookmarked;
    },
    // api 연결 version
    // async checkbookmarked() {
    //   try {
    //     await toggleReviewBookmark(this.FeedForYouList.id);
    //     this.FeedForYouList.bookmarked = !this.FeedForYouList.bookmarked
    //   } catch (error) {
    //   }
    // }
  },
  async created() {
    try {
      const { data } = await getFeedForYou({
        params: {
          address: this.$state.location,
        },
      });
      this.feedForYouList = data;
    } catch (error) {
      alert(error);
    }
  },
  // watch: {
  //   addr: function () {
  //     const { data } = getFeedForYou({
  //       params: {
  //         page: this.page,
  //         limit: this.limit,
  //         address: this.addr,
  //       }
  //     });
  //     this.feedForYouList = data;
  //   }
  // }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/TotalFeedForYouPage.scss';
</style>
