<template>
  <section class="review--container">
    <header>My Reviews</header>
    <article class="review--list">
      <div
        v-for="(review, index) in reviewList"
        :key="index"
        class="review--element"
        @click="moveToReviewPage(review.id)"
      >
        <div class="review--img--wrapper">
          <img :src="review.image[0]" />
          <span>😋 {{ review.score }}</span>
        </div>
        <div class="review--title">{{ review.title }}</div>
        <div class="review--updated">{{ $dayjs(review.updated_at).format('YYYY-MM-DD') }}</div>
      </div>
    </article>
    <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="loaded"></infinite-loading>
  </section>
</template>

<script>
import { reviewsByMe } from '@/api/review';
import InfiniteLoading from 'vue-infinite-loading';
export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      reviewList: [],
      loaded: true,
      page: 1,
      limit: 6,
    };
  },
  methods: {
    moveToReviewPage(id) {
      this.$router.push(`group/feed/detail/${id}`);
    },
    async loadReivewList() {
      try {
        const { data } = await reviewsByMe({
          params: {
            page: this.page,
            limit: this.limit,
          },
        });
        this.reviewList = [...this.reviewList, ...data.results];
        if (!data.next) this.loaded = false;
        else this.page++;
        this.$emit('totalCount', data.count);
        return data;
      } catch (error) {
        if (error.response.status == 404) this.loaded = false;
      }
    },
    async infiniteHandler($state) {
      try {
        await this.loadReivewList();
        $state.loaded();
      } catch (error) {
        $state.complete();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/profile/ProfileReviewList';
</style>
