<template>
  <div>
    <div class="box--border">
      <div class="header--bar">
        <span class="logo--text">taste</span>
        <span class="profile--tab">
          <div class="user--profile"></div>
          <span class="user--name">대현</span>
        </span>
      </div>
      <swiper ref="mySwiper" :options="swiperOption" @slide-change="slideChange">
        <swiper-slide v-for="(foodImage, i) in foodImages" :key="i">
          <span class="food--category">{{ foodCategory[i] }}</span>
          <div class="food--big--ment">{{ foodBigMent[i] }}</div>
          <div class="food--small--ment">{{ foodSmallMent[i] }}</div>
          <div class="img--wrap">
            <img class="round--img" :src="foodImage" />
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    slideChange() {
      const color = this.bgColorArr[this.$refs.mySwiper.$swiper.realIndex];
      document.querySelectorAll('.swiper-slide').forEach(node => {
        node.style.backgroundColor = color;
      });
      document.querySelectorAll('.food--category').forEach(node => {
        node.style.color = color;
      });

      document.querySelector('.header--bar').style.backgroundColor = color;
    },
    randomColor(num) {
      let res = [];
      for (let i = 0; i < num; i++) {
        const color = `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`;
        res.push(color);
      }
      return res;
    },
  },

  data() {
    return {
      foodImages: ['/assets/2.png', '/assets/1.jpg', '/assets/파스타.jpg', '/assets/곱창.jpg'],
      foodCategory: ['중식', '분식', '양식', '꼬기'],
      foodBigMent: [
        '중국집 가면 무조건 짜장면',
        '가끔 야식은 치킨보다 떡볶이',
        '크림 파스타는 언제나 옳다',
        '곱창 곱창 곱창 곱창 곱창 곱창',
      ],
      foodSmallMent: [
        '탕수육이 빠진건 아니겠죠?',
        '저는 순대파면서 튀김파입니다.',
        '내일은 알리오올리오 먹어야쥬',
        '와 벌써 침고임',
      ],
      page: 0,
      bgColorArr: ['rgb(121,107,98)', '#940c0c', '#c9b4a1', '#dd7c7c'],
      swiperOption: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        loop: true,
      },
    };
  },
};
</script>

<style scoped>
.box--border {
  box-sizing: border-box;
}

.food--small--ment {
  margin-left: 1rem;
  color: white;
  opacity: 0.7;
  font-size: 0.9rem;
}
.food--big--ment {
  margin-left: 1rem;
  display: inline-block;
  margin-bottom: 0.3rem;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
}
.food--category {
  display: inline-block;
  background-color: white;
  padding: 2px 5px;
  border-radius: 10%;
  margin: 0.5rem 1rem 1rem 1rem;
  font-size: 0.9rem;
  font-weight: 800;
  color: rgb(121, 107, 98);
}
.user--profile {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.8rem;
  font-size: 0.1rem;
  background-image: url('@/assets/morris.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
}
.user--name {
  color: white;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
.profile--tab {
  margin-right: 1rem;

  display: flex;
  align-items: center;
}
.logo--text {
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  margin-left: 1rem;
}
.header--bar {
  height: 50px;
  border-bottom: 1px solid white;
  transition: background 0.5s linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(121, 107, 98);
}
.swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  left: 15%;
}
.swiper-slide {
  transition: background 0.5s linear;
  background-color: rgb(121, 107, 98);
}
.img--wrap {
  overflow: hidden;
  height: 160px;
}

.round--img {
  position: relative;
  top: 0%;
  left: 30%;
  border-radius: 30vw;
  width: 60vw;
  height: 60vw;
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #e5e7eb;
}
.swiper-pagination >>> .swiper-pagination-bullet {
  background: white;
  opacity: 1;
}
</style>
