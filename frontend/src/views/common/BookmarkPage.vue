<template>
  <div class="bookmarked-page">
    <div @click="closeBookmarkedPage" class="bookmarked-page-close">
      <i class="fas fa-chevron-left fa-lg"></i>
    </div>
    <div class="bookmarked-page-title">
      bookmarks
    </div>
    <div class="bookmarked-list">
      <img
        class="bookmarked-page-image"
        v-for="(review, index) in this.bookmarkedReviewList.results"
        :key="index"
        @click="goToDetail(index)"
        :src="review.image[0] ? review.image[0] : require('@/assets/image/basic_review.jpg')"
        alt="review image"
      />
    </div>
  </div>
</template>

<script>
import { getBookmarkedList } from '@/api/profile';

export default {
  data() {
    return {
      id: '',
      image: '',
      page: 1,
      ord: 'desc',
      limit: 10,
      bookmarkedReviewList: [],
    };
  },
  async created() {
    try {
      const { data } = await getBookmarkedList({
        params: {
          page: this.page,
          ord: this.ord,
          limit: this.limit,
        },
      });
      this.bookmarkedReviewList = data;
    } catch (error) {
      alert(error);
      // alert('에러가 발생했습니다.)
    }
  },
  methods: {
    goToDetail(index) {
      const reviewId = this.bookmarkedReviewList.results[index].review;
      this.$router.push(`/group/feed/detail/${reviewId}`);
    },
    closeBookmarkedPage() {
      this.$router.push('/profile');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/profile/BookmarkedPage.scss';
</style>
