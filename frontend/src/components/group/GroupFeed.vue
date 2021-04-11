<template>
  <div class="group__post__wrapper">
    <div class="post__box" v-for="(item, index) in reviews" :key="index" :data-value="item.id" data-name="feed">
      <div class="inner__box">
        <div class="post__main__img"><img :src="item.image[0]" alt="" /></div>
        <div class="post__main__title">
          <h1>{{ item.title }}</h1>
          <p>{{ item.updated_at.slice(0, 10).replaceAll('-', '.') }}</p>
        </div>
      </div>
    </div>
    <div class="nofeed" v-if="nofeed"><img src="../../assets/image/box.png" alt="" /> No more feeds</div>
    <div class="feed__none" v-if="noneFeed">
      <div class="none__feed__img">
        <img src="../../assets/image/unicorn2.png" alt="" />
      </div>
      <p @click="moveToWriteFeed">소중한 추억을 작성해 보세요!</p>
    </div>
  </div>
</template>

<script>
import '@/assets/css/group/GroupFeed.css';
import init from '@/assets/js/group/GroupFeed';
import { groupReviewList } from '@/api/group';
export default {
  data() {
    return {
      reviews: [],
      currentPage: 1,
      loadingState: false,
      nofeed: false,
      noneFeed: false,
      dontrequ: true,
    };
  },
  mounted() {
    init.init();
    window.addEventListener('scroll', () => {
      let innerHeight = window.innerHeight;
      let bodyHeight = document.body.clientHeight;
      let scrollY = window.scrollY;
      if (this.$router.history.current.name === 'GroupPage') {
        if (scrollY + innerHeight >= bodyHeight) {
          if (!this.loadingState) {
            this.loadingState = true;
            this.currentPage++;
            const params = { page: this.currentPage, limit: 5, ord: 'desc' };
            if (this.dontrequ) {
              this.LoadReviews(this.id, params);
            }
          }
        }
      }
    });
  },
  methods: {
    async LoadReviews(id, params) {
      try {
        const response = await groupReviewList(id, params);
        this.reviews = [...this.reviews, ...response.data.results];
        if (response.data.results.length == 0) {
          this.noneFeed = true;
        }
        this.loadingState = false;
      } catch (error) {
        this.nofeed = true;
        setTimeout(() => {
          this.nofeed = false;
        }, 5000);
        this.dontrequ = false;
      }
    },
    moveToWriteFeed() {
      this.$router.push({ name: 'CreateReview' });
    },
  },
  created() {
    this.id = this.$router.history.current.params.id;
    this.currentPage = 1;
    const params = { page: this.currentPage, limit: 5, ord: 'desc' };
    this.LoadReviews(this.id, params);
    // const params = {
    //   page: 1,
    //   limit: 10,
    // };
    // axios.get('https://yogomogo.com/api/group/review/', { params }).then(response => {
    // });
  },
};
</script>

<style></style>
