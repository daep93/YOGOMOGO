<template>
  <div>
    <div class="feed-for-you-title-part">
      <p class="feed-for-you-sub-title">우리동네 추천피드💗</p>
      <span class="see-all-feed-for-you" @click="seeAll">see all</span>
    </div>
    <!-- {{ this.feedForYouList }} -->
    <div v-for="(review, index) in this.feedForYouList" :key="index">
      <!-- feed for you 낱개 -->
      <div class="feed-for-you-item">
        <!-- 이미지 -->
        <figure class="feed-for-you-image" @click="goToDetail(index)">
          <img
            :src="review.image[0] ? review.image[0] : require('@/assets/image/basic_review.jpg')"
            alt="review-image"
          />
        </figure>
        <!-- 식당 평점 -->
        <div class="feed-for-you-score-box">
          <p class="feed-for-you-score-text">😋 {{ review.score }}</p>
        </div>
        <!-- 북마크 -->
        <i
          @click="checkbookmarked(index)"
          v-if="!review.bookmarked"
          class="far fa-bookmark fa-lg feed-for-you-item-bookmark"
        ></i>
        <i @click="checkbookmarked(index)" v-else class="fas fa-bookmark fa-lg feed-for-you-item-bookmark"></i>
        <div class="feed-for-you-contents">
          <!-- 피드 상세 정보 -->
          <div class="feed-for-you-info">
            <div class="feed-for-you-info-main">
              <p class="feed-for-you-headcount">{{ review.headcount }}인</p>
              <span class="feed-for-you-item-title">{{ review.title }}</span>
              <!-- 식당명 / 식당 위치 -->
              <div class="feed-for-you-store-info">
                {{ review.restaurant_info.store_name }} / 🚩{{ rename(review.restaurant_info.address) }}
              </div>
            </div>
            <!-- 작성자 프로필 사진 -->
            <div class="feed-for-you-profile">
              <img
                :src="
                  review.writer.profile_img ? review.writer.profile_img : require('@/assets/image/basic_profile.jpg')
                "
                alt="writer-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { testCase } from '@/dummy/TotalHotFeed.js';
import { itemBased, getFeedForYou, toggleReviewBookmark } from '@/api/review';

export default {
  data() {
    return {
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

      data: testCase,
    };
  },
  async created() {
    this.loadFeed();
  },
  watch: {
    // TODO : 주소가 바뀔 때 마다 새로운 정보를 불러온다.
  },
  methods: {
    seeAll() {
      this.$router.push({ path: '/feed/for/you' });
    },
    async loadFeed() {
      try {
        // 가져올 데이터 목록
        itemBased();
        const { data } = await getFeedForYou({ params: { address: this.addr } });
        // const { data } = await getFeedForYou({
        //   params: {
        //     long: 1234,
        //     lat: 123,
        //     address: this.addr,
        //   }
        // });
        this.feedForYouList = data.splice(0, 5);
      } catch (error) {
        alert(error);
        // alert('에러가 발생했습니다.)
      }
    },
    goToDetail(index) {
      const reviewId = this.feedForYouList[index].id;
      this.$router.push(`/group/feed/detail/${reviewId}`);
    },
    rename(address) {
      const arr = address.split(' ');
      return arr[1] + ' ' + arr[2];
    },
    // api 연결 version
    async checkbookmarked(index) {
      try {
        await toggleReviewBookmark(this.feedForYouList[index].id);
        this.feedForYouList[index].bookmarked = !this.feedForYouList[index].bookmarked;
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/MainFeedForYou.scss';
</style>
