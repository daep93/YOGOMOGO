<template>
  <section>
    <header>
      <!-- 지도 -->
      <div id="map" class="map" style="z-index: 1"></div>
      <br />
      <!-- 검색바 -->
      <!-- 자동 완성 -->
      <nav class="search_bar">
        <select v-model="region" class="search_region" id="region" name="region" size="1">
          <option value="">전국</option>
          <option v-for="(theme_option, index) in theme_options" :key="index" :value="theme_option.text">
            {{ theme_option.text }}
          </option>
        </select>
        <input type="text" v-model="placeItem" placeholder="Search restaurant" @keydown.enter="searchRestaurant" />
        <span class="search" @click="searchRestaurant()">
          <i class="fas fa-search"></i>
        </span>
      </nav>
      <div class="suggeted_list" v-if="placeItem && filterRestList">
        <div class="suggested_one" v-for="(data, index) in filterRestList" :key="index" @click="chooseRestaurant(data)">
          <div class="restaraunt_item" v-if="data['address'].includes(region)">
            <div class="restaurant_detail">
              <p class="restaurant_name">{{ data['name'] }}</p>
              <p class="restaurant_address">{{ data['address'] }}</p>
            </div>
            <div class="restaurant_add" @click="afterCheckRestaurantList(data)">
              <i class="fas fa-check"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="color: white"></div>
    </header>
    <article>
      <div v-if="myBestRestaurantName.length > 0 && !filterRestList" class="selected_list">
        <p class="restaurant_count" v-if="count">{{ count }}개 더 추가해주세요</p>
        <div v-for="(data, index) in myBestRestaurantName.slice().reverse()" :key="index" class="selected_restaurant">
          <div class="restaurant_detail">
            <p class="restaurant_name">{{ data['name'] }}</p>
            <p class="restaurant_address">{{ data['address'] }}</p>
          </div>
          <div class="restaurant_add-btn">
            <div class="restaurant_add" @click="removeMyBestRestaurant(index)">
              <i class="fas fa-minus"></i>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="chooseMyBestRestaurant"
        :class="{
          complete_btn: myBestRestaurantList.length === 5,
          not_complete_btn: myBestRestaurantList.length < 5,
        }"
        v-if="myBestRestaurantList.length > 0 && !filterRestList"
        :disabled="myBestRestaurantList.length < 5"
      >
        SUBMIT
      </button>
    </article>
    <!-- <select-box></select-box> -->
  </section>
</template>

<script>
import { filteredRestaurant } from '@/utils/autoComplete';
import { sendBestRestaurant } from '@/api/auth';
// import SelectBox from '@/components/myBestRestaurant/SelectBox';

export default {
  // components: {
  //   SelectBox,
  // },
  props: {
    location: Array,
  },
  data() {
    return {
      restaurantName: '',
      restaurantAddress: '',
      list: [],
      place_x: null,
      place_y: null,
      placeItem: '',
      filterRestList: [],
      myBestRestaurantList: [],
      myBestRestaurantName: [],
      restaurant_list: [],
      buttonActive: false,
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
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_API_KEY}`;
      document.head.appendChild(script);
    }
  },
  computed: {
    count() {
      return 5 - this.myBestRestaurantList.length;
    },
  },
  methods: {
    afterCheckRestaurantList(data) {
      if (this.myBestRestaurantList.length > 0 && this.myBestRestaurantList.includes(data['id'])) {
        alert('이미 추가한 식당입니다');
      } else if (this.myBestRestaurantList.length > 0 && !this.myBestRestaurantList.includes(data['id'])) {
        this.addMyBestRestaurant(data);
        this.filterRestList = '';
      } else {
        this.addMyBestRestaurant(data);
        this.filterRestList = '';
      }
    },
    addMyBestRestaurant(data) {
      if (this.myBestRestaurantList.length < 5 && this.myBestRestaurantList.includes(data['id']) === false) {
        this.myBestRestaurantList.push(data['id']);
        this.myBestRestaurantName.push({ name: data['name'], address: data['address'] });
      }
      if (this.myBestRestaurantList.length === 5) {
        this.buttonActive = true;
      }
      this.filterRestList = '';
    },
    removeMyBestRestaurant(index) {
      this.myBestRestaurantList.splice(index, 1);
      this.myBestRestaurantName.splice(index, 1);
    },
    searchRestaurant() {
      // let removeSpace = this.placeItem.replace(/(\s*)/g, '');
      // this.filterRestList = filteredRestaurant(removeSpace);
      this.filterRestList = filteredRestaurant(this.placeItem);
    },
    initMap() {
      let mapContainer = document.getElementById('map'),
        mapOption = {
          center: new kakao.maps.LatLng(this.location[0], this.location[1]),
          level: 4,
        };
      let map = new kakao.maps.Map(mapContainer, mapOption);

      // 마커 표시 위치
      var markerPosition = new kakao.maps.LatLng(this.location[0], this.location[1]);

      // 마커 생성
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);
    },
    searchPlaceMap() {
      var mapContainer = document.getElementById('map'),
        mapOption = {
          center: new kakao.maps.LatLng(this.location[0], this.location[1]),
          level: 3,
        };

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(this.restaurantAddress, function(result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          // this.place_y = result[0].y;
          // this.place_x = result[0].x;
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    },
    chooseRestaurant(data) {
      (this.restaurantName = data['name']), (this.restaurantAddress = data['address']);
      this.searchPlaceMap();
    },
    async chooseMyBestRestaurant() {
      try {
        await sendBestRestaurant({
          restaurant_list: this.myBestRestaurantList,
        });
        alert('선택하신 정보가 성공적으로 전송됐습니다 :)');
        this.$router.push({ name: 'Feed' });
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/auth/Search';
</style>
