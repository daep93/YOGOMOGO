<template>
  <div class="group__recommend__wrapper">
    <div class="random__recommend__btn" @click="moveToRandom">
      <h3>
        <img src="../../assets/image/question.png" alt="" /> Random shuffle
        <img src="../../assets/image/question.png" alt="" />
      </h3>
    </div>
    <loading-spinner v-if="!dataLoadState"></loading-spinner>
    <div class="recommend__store__grid__container" v-if="dataLoadState">
      <div
        class="recommend__store__box"
        v-for="(value, index) in recommendStore"
        @click="moveToDetail(value.id)"
        :key="index"
      >
        <div class="store__inner__box">
          <div class="store__main__img">
            <img :src="store_image[index]" alt="" />
          </div>
          <div class="store__main__info">
            <h1>
              <img
                v-if="value.hot"
                src="../../assets/image/promotional.png"
                alt=""
              />{{ value.store_name }}
            </h1>
            <p>{{ value.address }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="bottomSensor"></div>
  </div>
</template>

<script>
import { groupRecommends } from "@/api/group";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { storeDetail } from "@/api/store";

export default {
  data() {
    return {
      id: 1,
      recommendStore: null,
      dataLoadState: false,
      currentPage: 1,
      store_image: [],
    };
  },
  components: {
    LoadingSpinner,
  },
  methods: {
    async loadData(id) {
      try {
        const params = {
          lat: 126.99,
          long: 35.7,
          address: this.$store.state.location.slice(0, 2),
        };
        const { data } = await groupRecommends(id, params);
        this.recommendStore = data.results;
        for (let i of this.recommendStore) {
          this.getDetail(i.id);
        }
        this.recommendStore.map((ele) => {
          if (ele.store_name.slice(0, 3) == "(H)") {
            ele.store_name = ele.store_name.replace("(H)", "");
            ele.hot = true;
          } else {
            ele.hot = false;
          }
        });
        this.dataLoadState = true;
      } catch (error) {
        alert(error);
      }
    },
    async getDetail(id) {
      const { data } = await storeDetail(id);
      this.store_image.push(data.image);
    },
    moveToDetail(id) {
      this.$router.push({
        name: "GroupPopUP",
        params: { id: id, from: "recommend" },
      });
    },

    moveToRandom() {
      this.$router.push({
        name: "GroupRecommendAllPage",
        params: { id: this.id, arr: this.recommendStore },
      });
    },
  },
  mounted() {},
  created() {
    this.id = this.$router.history.current.params.id;

    if (this.recommendStore === null) {
      this.loadData(this.id);
    }
  },
};
</script>

<style scoped>
.group__recommend__wrapper {
  width: 100vw;
  min-height: 100%;
  text-align: center;
}
.random__recommend__btn {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.random__recommend__btn h3 {
  background-color: #f3abb6;
  color: #fff;
  padding: 1rem;
  border-radius: 15px;
}
.random__recommend__btn h3 img {
  width: 1rem;
  height: 1rem;
}

.random__btn {
  width: 100%;
  height: 6vh;
}
.recommend__store__grid__container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1;
  place-items: center;
  gap: 30px;
  padding: 0 1.5rem;
}

.recommend__store__box {
  width: 100%;
  height: 10rem;
}

.store__inner__box {
  width: 100%;
  height: 100%;
}

/* .recommend__store__box:nth-child(2n) {
  padding-top: 1.5rem;
}
.recommend__store__box:nth-child(2n + 1) {
  padding-bottom: 1.5rem;

} */

.store__main__img {
  width: 100%;
  height: 75%;
  border-radius: 0.7rem;
  background-image: url("../../assets/image/comingsoon2.png");
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: no-repeat;
}

.store__main__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.store__main__info {
  width: 100%;
  height: 25%;
  display: flex;
  padding: 1.5rem 0.5rem;
  justify-content: space-between;
  align-items: center;
}
.store__main__info h1 {
  /* width: 14rem; */
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1.3rem;
  text-overflow: ellipsis;
  font-family: "Do Hyeon", sans-serif;
}
.store__main__info h1 img {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  object-fit: cover;
}
.store__main__info p {
  width: 5.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-top: 0.5rem;
  font-size: 0.5rem;
  color: rgba(0, 0, 0, 0.5);
  font-family: "Jua", sans-serif;
}
</style>
