<template>
  <div>
    <div class="profile_statics-page">
      <h3>puppy님의 그룹</h3>
      <div v-for="(group, idx) in info.groups" :key="idx">그룹 리스트: {{ group['name'] }}</div>
      <swiper class="profile_testimonials" :options="swiperOption">
        <swiper-slide class="profile_swiper-slide">
          <div class="profile_card" @click="goToAddGroup">
            <div class="profile_add-group">
              <p class="profile_add-font-plus">+</p>
            </div>
            <h5 class="profile_add-group-font">그룹 추가</h5>
          </div>
        </swiper-slide>
        <swiper-slide class="profile_swiper-slide" style="margin-left: 30px;">
          <div class="profile_card">
            <div class="profile_content">
              <img src="https://www.ssafy.com/swp/images/sns_img.png" style="height: 75px; width: 90px" />
              <h5 class="profile_group-font">SSAFY 4th</h5>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="profile_swiper-slide">
          <div class="profile_card">
            <div class="profile_content">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Friends_season_one_cast.jpg/220px-Friends_season_one_cast.jpg"
                style="height: 75px; width: 90px"
              />
              <h5 class="profile_group-font">친구</h5>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="profile_swiper-slide">
          <div class="profile_card">
            <div class="profile_content">
              <img
                src="https://familybuildersok.org/wp-content/uploads/2019/02/happy-family.jpg"
                style="height: 75px; width: 90px"
              />
              <h5 class="profile_group-font">family</h5>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="profile_swiper-slide">
          <div class="profile_card">
            <div class="profile_content">
              <img
                src="https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg"
                style="height: 75px; width: 90px"
              />
              <h5 class="profile_group-font">문경15</h5>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <h3>이번달 함께한 그룹</h3>
      <swiper class="profile_testimonials" :options="swiperOption">
        <swiper-slide class="profile_swiper-slide" style="margin-left: 30px;">
          <div class="profile_card">
            <div class="profile_content">
              <img src="https://www.ssafy.com/swp/images/sns_img.png" style="height: 75px; width: 90px" />
              <h5 class="profile_group-font">SSAFY 4th</h5>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="profile_swiper-slide">
          <div class="profile_card">
            <div class="profile_content">
              <img
                src="https://familybuildersok.org/wp-content/uploads/2019/02/happy-family.jpg"
                style="height: 75px; width: 90px"
              />
              <h5 class="profile_group-font">family</h5>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <h3>이번달 많이 먹은 음식</h3>
      <swiper class="profile_testimonials" :options="swiperOption">
        <swiper-slide class="profile_swiper-slide" style="margin-left: 30px;">
          <div class="profile_card">
            <div class="profile_content">
              <img
                src="https://www.hapskorea.com/wp-content/uploads/2019/08/black-angus-lobster-ball-pizza.jpg"
                style="height: 75px; width: 90px"
              />
              <h5 class="profile_group-font">피자</h5>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="profile_swiper-slide">
          <div class="profile_card">
            <div class="profile_content">
              <img
                src="https://pelicana.co.kr/resources/images/menu/best_menu02_200824.jpg"
                style="height: 75px; width: 90px"
              />
              <h5 class="profile_group-font">치킨</h5>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="profile_swiper-slide">
          <div class="profile_card">
            <div class="profile_content">
              <img
                src="https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2019%2F09%2Fmcdonalds-beyond-meat-plant-plt-burger-000-1.jpg?q=75&w=800&cbr=1&fit=max"
                style="height: 75px; width: 90px"
              />
              <h5 class="profile_group-font">햄버거</h5>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <h3>puppy님의 음식 선호도 (차트)</h3>
      <taste-radar></taste-radar>
      <h3>puppy님의 Food Mate💖</h3>
      <div class="profile_Foodmate_all ">
        <img
          class="profile_food-mate-user"
          src="https://p0.pikist.com/photos/2/71/chihuahua-dog-animals-canines-puppy-profile-dog-pet-adorable-look.jpg"
          ref="profile_foodmate"
        />
        <counter v-if="loading"></counter>
        <img class="profile_food-mate-friend" src="https://i.ytimg.com/vi/dk137nhAK3E/maxresdefault.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import Counter from '@/components/profile/Counter';
import TasteRadar from '@/components/profile/TasteRadar';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  props: {
    info: Object,
  },
  name: 'swiper-example-multiple-slides-per-biew',
  title: 'Multiple slides per view',
  components: {
    Swiper,
    SwiperSlide,
    Counter,
    TasteRadar,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      loading: false,
    };
  },
  methods: {
    goToAddGroup() {
      this.$router.push({ name: 'AddGroup' });
    },
  },
  mounted() {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 감지대상이 교차영역에 진입 할 경우
            this.loading = true;
            observer.unobserve(entry.target); // 이미지 로딩 이후론 관찰할 필요 x
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
      },
    );
    io.observe(this.$refs.profile_foodmate);
  },
};
</script>

<style scoped></style>
