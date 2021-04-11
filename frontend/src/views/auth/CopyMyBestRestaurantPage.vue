<template>
  <div>
    <!-- 검색바 -->
    <!-- 자동 완성 -->
    <input type="text" v-model="placeItem" placeholder="Search" style="margin: 50px 0 20px 30px;" />
    <button @click="searchRestaurant()">검색하기</button>
    <div v-if="suggests" style="height: 200px;">
      <!-- <div v-if="suggests.length > 0" style="height: 200px;"> -->
      <div
        v-for="(data, index) in suggests"
        :key="index"
        @click="chooseRestaurant(data)"
        style="width: 300px; margin-left: 30px; border: 1px solid;"
      >
        <p>{{ data[2] }}</p>
        <br />
        <p>{{ data[3] }}</p>
        <br />
        <p>경도: {{ data[5] }}</p>
        <br />
        <p>위도: {{ data[4] }}</p>
        <button @click="addMyBestRestaurant(data[0])">추가하기</button>
        <hr v-if="index !== list.length - 1" />
      </div>
    </div>

    <!-- 지도 -->
    <!-- <Map></Map> -->
  </div>
</template>

<script
  type="text/javascript"
  src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d20b4c825a0c8a3692a3b393f0b5cfe&libraries=services"
></script>
<script>
import axios from 'axios';
import { filteredRestaurant } from '@/utils/autoComplete';
// import Map from '@/components/myBestRestaurant/Map';

export default {
  // components: {
  //   Map,
  // },
  data() {
    return {
      restaurantName: '',
      restaurantInfo: '',
      list: [],
      place_x: null,
      place_y: null,
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
    restaurantSearch(restaurantName) {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=15&sort=accuracy&query=${restaurantName}`,
          {
            headers: {
              Authorization: 'KakaoAK 3d20b4c825a0c8a3692a3b393f0b5cfe',
            },
          },
        )
        .then(res => {
          this.list = res.data.documents;
        });
    },

    chooseRestaurant(restaurant) {
      (this.restaurantName = restaurant.place_name), (this.restaurantInfo = restaurant);
      this.place_x = restaurant.x;
      this.place_y = restaurant.y;
      // this.searchPlaceMap();
      this.list = [];
    },
  },
};
</script>

<style scoped></style>
