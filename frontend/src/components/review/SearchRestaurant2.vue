<template>
  <div>
    <p class="search-restaurant-subtitle">식사장소</p>
    <input class="search-restaurant-input" type="text" v-model="placeItem" placeholder="Search" />
    <div v-if="suggests" class="search-restaurant-list">
      <div
        v-for="(data, index) in suggests"
        :key="index"
        @click="chooseRestaurant(data)"
        class="search-restaurant-selected-item"
      >
        <p class="search-restaurant-selected-name">{{ data['name'] }}</p>
        <br />
        <p class="search-restaurant-selected-address">{{ data['address'] }}</p>
        <br />
      </div>
    </div>
  </div>
</template>

<script async src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script>
import { filteredRestaurant } from '@/utils/autoComplete';

export default {
  data() {
    return {
      restaurantName: '',
      restaurantInfo: '',
      list: [],
      placeItem: '',
      filterRestList: [],
      myBestRestaurantList: [],
    };
  },
  computed: {
    suggests() {
      return filteredRestaurant(this.placeItem);
    },
  },
  methods: {
    addMyBestRestaurant(id) {
      this.myBestRestaurantList.push(id);
    },
    searchRestaurant() {
      this.filterRestList = filteredRestaurant(this.placeItem);
    },
    chooseRestaurant(data) {
      this.placeItem = data['name'];
      this.restaurantInfo = data;
      this.$emit('addRestaurantItem', this.restaurantInfo);
      // (this.restaurantName = data[2]), (this.restaurantInfo = data);
      // this.place_x = data[5];
      // this.place_y = data[4];
      // this.searchPlaceMap();
      // this.list = [];
    },
    // chooseRestaurant(restaurant) {
    //   (this.restaurantName = restaurant.place_name), (this.restaurantInfo = restaurant);
    //   this.place_x = restaurant.x;
    //   this.place_y = restaurant.y;
    //   this.searchPlaceMap();
    //   this.list = [];
    // },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/SearchRestaurant.scss';
</style>
