<template>
  <div class="menu__detail__list">
    <swiper class="swiper__group" :options="swiperOption">
      <swiper-slide
        class="slider__box"
        v-for="(item, index) in images"
        :key="index"
      >
        <div class="menu__img">
          <div v-show="item">
            <img :src="item" alt="" />
          </div>
          <div v-show="!item">
            <img src="../../assets/image/comingsoon.png" alt="" />
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "@/assets/css/MenuList.css";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 1,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  props: {
    images: Array,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  created() {},
};
</script>
