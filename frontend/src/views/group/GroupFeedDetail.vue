<template>
  <div class="group__feed">
    <div class="feed__header">
      <h1>베스킨라빈스</h1>
      <div class="exit">X</div>
    </div>
    <div class="feed__section">
      <div class="feed__imgs">
        <menu-list class=""></menu-list>
      </div>
      <div class="kakaomap__feed">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/group/GroupPopUp.css';
// import init from '../../assets/js/GroupPopUp';
import MenuList from '@/components/group/MenuList';

export default {
  components: {
    MenuList,
  },
  props: ['groupId'],
  created() {
    this.initPage();
  },
  mounted() {
    // init.init();
    // if (window.kakao && window.kakao.maps) {
    //   this.initMap();
    // } else {
    //   const script = document.createElement('script');
    //   const kakao = document.querySelector('.kakaomap__feed');
    //   /* global kakao */
    //   script.onload = () => kakao.maps.load(this.initMap);
    //   script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=7484290f9ef70a2a6c9b5e9280c30d93';
    //   kakao.appendChild(script);
    // }
  },
  methods: {
    initMap() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
          // center: new kakao.maps.LatLng(36.386595461878876, 127.34998863544777), // 지도의 중심좌표
          center: new kakao.maps.LatLng(36.3885517, 127.34940130000001), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption);
      this.createMarker(map);
    },
    initPage() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },
    createMarker(map) {
      // 36.386595461878876, 127.34998863544777
      var markerPosition = new kakao.maps.LatLng(36.386595461878876, 127.34998863544777);
      // var imageSrc = require('@/assets/image/placeholder.png'),
      //   imageSize = new kakao.maps.Size(20, 30),
      //   imageOption = { offset: new kakao.maps.Point(10, 30) };
      var imageSrc = require('@/assets/image/carrot.png'),
        imageSize = new kakao.maps.Size(40, 50),
        imageOption = { offset: new kakao.maps.Point(20, 50) };
      // 마커를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    },
  },
};
</script>
