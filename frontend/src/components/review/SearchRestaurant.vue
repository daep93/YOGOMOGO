<template>
  <div>
    <p class="search-restaurant-subtitle">지역 및 음식점</p>
    <select v-model="region" class="search-restaurant-select" id="region" name="region">
      <option v-for="(theme_option, index) in theme_options" :key="index" :value="theme_option.text">
        {{ theme_option.text }}
      </option>
    </select>
    <div class="search-restaurant-input-area">
      <input
        class="search-restaurant-input"
        type="text"
        v-model="placeItem"
        @keydown.enter="searchRestaurant"
        placeholder="Search"
      />
      <button @click="searchRestaurant" class="search-restaurant-button">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div v-if="placeItem" class="search-restaurant-list">
      <div
        v-for="(data, index) in this.filterRestList"
        :key="index"
        @click="chooseRestaurant(data)"
        class="search-restaurant-selected-item"
      >
        <div v-if="data['address'].split(' ')[0].includes(region)">
          <div>
            <p class="search-restaurant-selected-name">{{ data['name'] }}</p>
            <br />
            <p class="search-restaurant-selected-address">
              {{ data['address'] }}
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="none"></div>
    <div v-if="this.propsRestaurant['store_name']">
      <p class="search-restaurant-selected-name">
        {{ this.propsRestaurant['store_name'] }}
      </p>
      <br />
      <p class="search-restaurant-selected-address">
        {{ this.propsRestaurant['address'] }}
      </p>
      <br />
    </div>
    <div class="none" v-else></div>
  </div>
</template>

<script async src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script>
import { filteredRestaurant } from '@/utils/autoComplete';

export default {
  props: ['propsRestaurant'],
  data() {
    const index = this.$route.params.id;
    return {
      restaurantName: '',
      restaurantInfo: '',
      list: [],
      result: true,
      placeItem: '',
      region: '',
      theme_options: [
        { text: '강원', value: 0 },
        { text: '경기', value: 1 },
        { text: '충청', value: 2 },
        { text: '전라', value: 3 },
        { text: '경상', value: 4 },
        { text: '제주', value: 5 },
        { text: '서울', value: 6 },
        { text: '부산', value: 7 },
        { text: '대구', value: 8 },
        { text: '인천', value: 9 },
        { text: '대전', value: 10 },
        { text: '광주', value: 11 },
        { text: '울산', value: 12 },
        { text: '세종', value: 13 },
      ],
      filterRestList: [],
      myRestaurant: [],
    };
  },
  // computed: {
  //   suggests() {
  //     return filteredRestaurant(this.placeItem);
  //   },
  // },
  methods: {
    // addRestaurant(data) {
    //   this.myRestaurant = [];
    //   this.myRestaurant.push(data['id']);
    //   this.restaurantName.push({ name: data['name'], address: data['address']});
    //   this.filterRestList = '';
    // },
    searchRestaurant() {
      this.filterRestList = filteredRestaurant(this.placeItem);
    },
    chooseRestaurant(data) {
      // this.placeItem = data['name'];
      this.restaurantName = data['name'];
      this.restaurantInfo = data;
      this.placeItem = data['name'] + '(' + data['address'] + ')';
      this.$emit('addRestaurantItem', this.restaurantInfo);
      this.filterRestList = '';

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
  created() {
    const review_id = this.$route.params.id;
    if (review_id) {
      // this.region = this.propsRestaurant['area'];
      // this.placeItem = this.propsRestaurant['store_name'] + '(' + this.propsRestaurant['address'] + ')';
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/SearchRestaurant.scss';
</style>
