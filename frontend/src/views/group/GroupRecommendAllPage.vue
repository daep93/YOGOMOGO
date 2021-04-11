<template>
  <div class="recommend__all__wrapper">
    <div class="recommend__all__header">
      <div class="recommend__all__exit">
        <img src="../../assets/image/left.png" alt="" />
      </div>
      <h1>
        <img src="../../assets/image/dizzy.png" alt="" /> 음식점을 선택하기
        힘드세요?!
      </h1>
      <p>여러분의 소중한 시간을 지켜드릴게요!</p>
      <div class="random__choice">
        <div
          class="random__before"
          v-show="randomState"
          @click="randomState = false"
        >
          랜덤 음식점 선택
        </div>
        <div
          class="random__after"
          v-show="!randomState"
          @click="randomState = true"
        >
          음식점 모두 보기
        </div>
        <div class="random__choice__btn" v-show="!randomState">
          마구마구 섞어섞어
        </div>
      </div>
    </div>
    <div class="recommend__all__section" v-show="randomState">
      <div class="recommend__all__grid__container">
        <div
          class="recommend__box"
          v-for="(item, index) in storesList"
          :key="index"
          :data-value="item.id"
        >
          <div class="recommend__box__img">
            <div v-show="item.image != ''">
              <img :src="item.image" alt="" />
            </div>
            <div v-show="item.image === ''">
              <img src="../../assets/image/comingsoon.png" alt="" />
            </div>
          </div>
          <div class="recommend__box__title">
            <!-- {{ item.store_name }} -->
            <img
              v-if="item.hot"
              src="../../assets/image/promotional2.png"
              alt=""
            />
            <h1 class="store__name__random">{{ item.store_name }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend__all__section" v-show="!randomState">
      <div class="recommend__all__grid__container__choice">
        <div
          class="choice__box"
          v-for="(item, index) in storesList"
          :key="index"
          :data-value="item.store_name"
          :data-img="item.image"
          :data-id="item.id"
        >
          <div class="choice__box__img">
            <div v-show="item.image != ''">
              <img :src="item.image" alt="" />
            </div>
            <div v-show="item.image === ''">
              <img src="../../assets/image/comingsoon.png" alt="" />
            </div>
          </div>
          <div class="choice__box__title">
            <h1 class="store__name__random">{{ item.store_name }}</h1>
            <!-- {{ item }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { init, choice } from "@/assets/js/GroupRecommendAll";
import { groupRecommends } from "@/api/group";

export default {
  data() {
    return {
      randomState: true,
      choicedList: [],
      storesList: {},
      id: 0,
    };
  },
  methods: {
    loadData(data) {
      this.storesList = data;
      this.storesList.map((ele) => (ele.image = ""));
      this.storesList.map((ele) => {
        if (ele.store_name.slice(0, 3) == "(H)") {
          ele.store_name = ele.store_name.replace("(H)", "");
          ele.hot = true;
        } else {
          ele.hot = false;
        }
      });
      this.dataLoadState = true;
    },
  },
  mounted() {
    init();
    choice();
  },
  created() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.id = this.$router.history.current.params.id;
    this.restaurants = this.$router.history.current.params.arr;
    this.loadData(this.restaurants);
    // this.loadData(this.id);
  },
};
</script>

<style scoped>
.recommend__all__wrapper {
  width: 100vw;
  /* height: 100%; */
  overflow-x: hidden;
  /* transform: translateX(200px); */
  /* background-color: #ffece3; */

  animation: FadeInLeft 0.4s forwards;
}

@keyframes FadeInLeft {
  0% {
    transform: translateY(300px);
  }
  100% {
    transform: translateY(0);
  }
}
.recommend__all__header {
  position: relative;
  width: 100%;
  height: 20vh;
  padding: 1rem;
  text-align: center;
}
.recommend__all__header h1 {
  padding: 2rem 0 0.6rem;
  font-size: 1.3rem;
}
.recommend__all__header p {
}
.recommend__all__header h1 img {
  width: 1.5rem;
  height: 1.5rem;
}
.random__choice {
  margin-top: 1.3rem;
  display: flex;
  justify-content: space-evenly;
  position: relative;
}

.random__before,
.random__after,
.random__choice__btn {
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid;
  color: #fff;
  color: #9f8189;
  font-size: 1rem;
  font-weight: 600;

  background-color: #ffcad4;
}
.recommend__all__exit {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.recommend__all__exit img {
  width: 1rem;
  height: 1rem;
}
.recommend__all__section {
  padding: 0 0.1rem 1rem;
  width: 100%;
  height: 80%;
}

.recommend__all__grid__container,
.recommend__all__grid__container__choice {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 0.5rem 0.5rem 1rem;
  transform: translate3d(0, 0, 0);
  transition: all 750ms ease;
}

.choice__box,
.recommend__box {
  height: 13rem;
  /* width: 31%; */
  /* height: 8rem; */
  /*  background-color: antiquewhite;*/
  /* margin-right: 0.05rem; */
  /*  padding: 0.1rem;*/
  /* color: #9f8189; */
  filter: grayscale(0);
  background-color: #ffcad4;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.choice__box {
  filter: grayscale(1);
}
.choice__box:nth-child(4n),
.recommend__box:nth-child(4n) {
  background-color: #f3abb6;
}
.choice__box:nth-child(4n + 1),
.recommend__box:nth-child(4n + 1) {
  background-color: #f3abb6;
}

.recommend__box__img,
.recommend__box__title,
.choice__box__img,
.choice__box__title {
  pointer-events: none;
  width: 100%;
}

.recommend__box__img,
.choice__box__img {
  height: 85%;
  padding: 1rem 0.5rem;
}
.recommend__box__title,
.choice__box__title {
  height: 10%;
  text-align: center;
}
.recommend__box__title img {
  width: 1.5rem;
  height: 1.5rem;
}
.choice__box__img img,
.recommend__box__img img {
  pointer-events: none;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.choiced {
  filter: grayscale(0);
}

.store__name__random {
  padding: 0 1rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
