<template>
  <div class="score-rating-total">
    <div class="score-rating">
      <span v-for="num in maxRating" :key="num" :class="starClassList[num - 1]" @click="clickStar(num)">★ </span>
    </div>
    <p v-if="propsRatingData >= 1">나의 별점 : {{ propsRatingData }} 점</p>
    <p v-else>나의 별점 : 0 점</p>
  </div>
</template>

<script>
import { reviewDetail } from '@/api/review';
export default {
  props: ['propsRatingData'],
  data() {
    return {
      rating: NaN,
      maxRating: 5,
    };
  },
  computed: {
    starClassList() {
      const arr = [];
      for (let i = 0; i < this.maxRating; i++) {
        const classes = ['star'];
        if (i <= this.rating) {
          classes.push('gold');
        }
        arr.push(classes);
      }
      return arr;
    },
  },
  methods: {
    clickStar(num) {
      this.rating = num - 1;
      this.$emit('addStarScore', this.rating);
    },
  },
  async created() {
    const review_id = this.$route.params.id;
    if (review_id) {
      try {
        const { data } = await reviewDetail(review_id);
        this.rating = data.score - 1;
        const arr = [];
        for (let i = 0; i < this.maxRating; i++) {
          const classes = ['star'];
          if (i <= this.rating) {
            classes.push('gold');
          }
          arr.push(classes);
        }
      } catch (error) {
        alert(error);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/StarRating.scss';
</style>
