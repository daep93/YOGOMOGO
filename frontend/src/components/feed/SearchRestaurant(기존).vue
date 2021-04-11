<template>
  <div>
    <p class="feed-create-subtitle">음식점 정보</p>
    <div class="search-restaurant-total">
      <!-- <input class="search-restaurant" v-model="restaurant" type="text" v-if="computedRestaurant"> -->
      <input class="search-restaurant" v-model="restaurant" type="text" />
      <button class="search-restaurant-btn" @click="restaurantSearch(restaurant)">검색</button>
    </div>
    {{ propsRestaurant.place_name }}
    <div class="select-restaurant" v-for="(sikdang, index) in list" :key="index" @click="chooseRestaurant(sikdang)">
      <p class="select-restaurant-title">{{ sikdang.place_name }}</p>
      <br />
      <p class="select-restaurant-address">{{ sikdang.address_name }}</p>
      <hr v-if="index !== list.length - 1" />
    </div>
  </div>
</template>
<script
  type="text/javascript"
  src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d20b4c825a0c8a3692a3b393f0b5cfe&libraries=services"
></script>
<script>
import axios from 'axios';
import { filteredRestaurant } from '@/utils/autoComplete';
import '@/assets/styles/SearchRestaurant.css';
export default {
  props: ['propsRestaurant'],
  data() {
    return {
      restaurant: '',
      // restaurant: propsRestaurant.place_name,
      restaurantInfo: '',
      list: [],
    };
  },

  methods: {
    restaurantSearch(restaurant) {
      axios
        .get(`https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query=${restaurant}`, {
          headers: {
            Authorization: 'KakaoAK 3d20b4c825a0c8a3692a3b393f0b5cfe',
          },
        })
        .then(res => {
          this.list = res.data.documents;
        });
    },
    chooseRestaurant(sikdang) {
      (this.restaurant = sikdang.place_name), (this.restaurantInfo = sikdang);
      this.$emit('addRestaurantItem', this.restaurantInfo);
      this.list = [];
    },
  },
  // created() {
  //   const review_id = this.$route.params.id;
  //   if (review_id) {
  //     this.restaurant = propsRestaurant.place_name

  //   }
  // }
  computed: {
    computedRestaurant() {
      if (propsRestaurant.place_name) {
        this.restaurant = propsRestaurant.place_name;
      }
      return this.restaurant;
    },
  },
};
</script>

<style></style>
