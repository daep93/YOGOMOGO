<template>
  <div class="group__page__wrapper">
    <div class="group__page__container">
      <div class="background__img" :style="{ backgroundImage: 'url(' + groupInfo.img + ')' }"></div>
      <div class="group__page__header">
        <div class="group__exit" @click="groupExit"><img src="../../assets/image/left.png" alt="" /></div>
      </div>
      <div class="group__page__section">
        <div class="group__page__section__header">
          <div class="group__page__info">
            <h1 class="group__page__info__title">
              {{ groupInfo.name }}
              <span class="edit__group"
                ><img
                  src="../../assets/image/settings.png"
                  class="profileSettings"
                  @click="moveToGroupEdit"
                  :data-value="id"
                  alt=""
              /></span>
            </h1>
            <p class="group__page__info__desc" v-if="dataLoadState">{{ groupInfo.members.length }} pepople</p>
          </div>

          <div class="group__member__container">
            <div class="member__profile__imgs">
              <div
                class="member__card"
                v-for="(member, index) in groupInfo.abs_members"
                :key="index"
                :style="`left:${index * 2.5 + 0.5}rem; animation-delay:${index * 0.15}s;`"
              >
                <div v-if="member.state">
                  <div v-if="member.profile_img === ''">
                    <img src="../../assets/image/profile_basic.png" alt="" />
                  </div>
                  <div v-else>
                    <img :src="member.profile_img" alt="프로필 이미지" />
                  </div>
                </div>
                <div v-else class="num__members">+{{ member.length_num }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="render__btn__section">
          <div class="reviews__btn btn__box btn__clicked" @click="(showReview = true), AttachClassReview()">
            Reviews
          </div>
          <div class="recommend__btn btn__box" @click="(showReview = false), AttachClassRecommend()">
            Recommend
          </div>
        </div>
        <div class="render__section">
          <group-feed v-if="showReview"></group-feed>
          <group-recommend v-else></group-recommend>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/group/Group.css';
import 'swiper/css/swiper.css';
import GroupFeed from '@/components/group/GroupFeed';
import GroupRecommend from '@/components/group/GroupRecommend';
import { groupDetail } from '@/api/group';
import { init } from '@/assets/js/group/GroupPage.js';
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 1,
        slidesPerGroup: 4,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      dataLoadState: false,
      id: '',
      groupInfo: {},
      page: 0,
      photos: [],
      showReview: true,
    };
  },
  props: ['groupId'],
  mounted() {
    init();
  },
  components: {
    GroupFeed,
    GroupRecommend,
  },
  methods: {
    async loadData(id) {
      try {
        const { data } = await groupDetail(id);
        this.groupInfo = data;
        this.groupInfo.members.map(ele => (ele['state'] = true));

        if (this.groupInfo.members.length > 5) {
          this.groupInfo['abs_members'] = this.groupInfo.members.slice(0, 4);
          this.groupInfo['abs_members'].push({
            profile_img: '',
            length_num: this.groupInfo.members.length - 4,
            state: false,
          });
        } else {
          this.groupInfo['abs_members'] = this.groupInfo.members;
        }
        this.dataLoadState = true;
      } catch (error) {
        console.log(error);
      }
    },
    moveToGroupEdit() {
      const groupPageWrapper = document.querySelector('.group__page__wrapper');
      groupPageWrapper.classList.add('clicked');
      setTimeout(() => {
        // this 객체의 문제
        this.$router.push(`/group/update/${this.id}`);
      }, 500);
    },
    AttachClassReview() {
      const reviewBtn = document.querySelector('.reviews__btn');
      const recommendBtn = document.querySelector('.recommend__btn');
      reviewBtn.classList.add('btn__clicked');
      recommendBtn.classList.remove('btn__clicked');
    },
    AttachClassRecommend() {
      const recommendBtn = document.querySelector('.recommend__btn');
      const reviewBtn = document.querySelector('.reviews__btn');
      recommendBtn.classList.add('btn__clicked');
      reviewBtn.classList.remove('btn__clicked');
    },
    groupExit() {
      this.$router.go(-1);
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.loadData(this.id);
  },
};
</script>

<style scoped>
.swiper__group {
  height: 20vh;
}
.slider__box {
  height: 8rem;
  padding: 0.1rem;
}

.slider__box span {
  pointer-events: none;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  border-radius: 1rem;
  box-shadow: 5px 5px 12px -3px rgba(0, 0, 0, 0.13);
  /* box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212); */
}

.slider__box img {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
}

.group__post h1 {
  padding: 1rem;
  font-family: 'Gothic A1', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  /* color: #d96963; */
  color: rgba(119, 109, 97);
}

.edit__group {
  display: inline-block;
  width: 15px;
  height: 15px;
}

.edit__group img {
  width: 100%;
  height: 100%;
}
.btn__clicked {
  background-color: #000;
  color: white;
}
</style>
