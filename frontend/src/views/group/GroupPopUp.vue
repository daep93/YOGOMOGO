<template>
  <div class="group__recommend__detail">
    <span class="exit__recommend__detail" @click="exitrecommendDetail"
      ><img src="../../assets/image/left.png" alt=""
    /></span>
    <h1 class="main__menus" v-if="name === 'feed'">
      우리의 추억
      <img
        @click="moveToReviewEdit"
        src="../../assets/image/settings.png"
        alt=""
      />
    </h1>
    <h1 class="main__menus" v-else>대표 메뉴</h1>
    <div class="group__recommend__detail__header">
      <menu-list
        v-if="loadstatus"
        class="menus__list"
        :images="images"
      ></menu-list>
    </div>

    <div class="group__recommend__detail__section__wrapper">
      <div
        class="group__recommend__detail__section"
        v-if="name === 'recommend' && loadstatus"
      >
        <p class="recommend__store__category">{{ category }}</p>
        <h1>{{ storeInfo.store_name.replace("(H)", "") }}</h1>
        <p class="recommend__store__address">
          <img src="@/assets/image/map1.png" alt="" /> {{ storeInfo.address }}
        </p>

        <p v-if="storeInfo.score != 0" class="recommend__store__score">
          <img src="@/assets/image/tongue.png" alt="" /> {{ storeInfo.score }} /
          5
        </p>

        <p class="recommend__store__tel">
          <img src="@/assets/image/phone-call.png" alt="" />
          {{ storeInfo.tel ? storeInfo.tel : "미등록" }}
        </p>
      </div>

      <div
        class="group__feed__detail__section"
        v-if="name === 'feed' && loadstatus"
      >
        <div class="group__feed__header">
          <h1>{{ reviewInfo.restaurant_info.store_name }}</h1>
          <p class="feed__store__score">
            <img src="@/assets/image/tongue.png" alt="" />
            {{ reviewInfo.restaurant_info.score }} / 5
          </p>
        </div>
        <p class="feed__store__address">
          <img src="@/assets/image/dish.png" alt="" />
          {{ reviewInfo.restaurant_info.category.replaceAll("|", ",") }}
          <br />
          <img src="@/assets/image/map1.png" alt="" />
          {{ reviewInfo.restaurant_info.address }}
        </p>
        <div class="feed__group__members">
          <div
            class="feed__member__card"
            v-for="(member, index) in groupInfo.abs_members"
            :key="index"
            :style="`left:${index * 2.5 + 0.5}rem; animation-delay:${
              index * 0.15
            }s;`"
          >
            <div v-if="member.state">
              <div v-if="member.profile_img === ''">
                <img src="../../assets/image/profile_basic.png" alt="" />
              </div>
              <div v-else>
                <img :src="member.profile_img" alt="프로필 이미지" />
              </div>
            </div>
            <div v-else class="feed__num__members">
              +{{ member.length_num }}
            </div>
          </div>
        </div>

        <p class="feed__store__category">{{ reviewInfo.contents }}</p>
        <div class="feed__store__tag">
          <div
            class="feed__tag"
            v-for="(tag, index) in reviewInfo.tags"
            :key="index"
          >
            #{{ tag }}
          </div>
        </div>
      </div>

      <div class="kakao__map">
        <div class="none__map__image" v-show="!longitude">
          <img src="../../assets/image/comingsoon.png" alt="" />
        </div>
        <div class="popup__map__title">
          <a
            v-if="name === 'feed' && loadstatus"
            :href="`https://map.kakao.com/link/search/${reviewInfo.restaurant_info.address}`"
            target="_blank"
            >카카오맵으로 검색 및 길찾기</a
          >
          <a
            v-if="name === 'recommend' && loadstatus"
            :href="`https://map.kakao.com/link/search/${storeInfo.address}`"
            target="_blank"
            >카카오맵으로 검색 및 길찾기</a
          >
        </div>
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/GroupRecommendDetail.css";
import "swiper/css/swiper.css";
import MenuList from "@/components/group/MenuList";
import { init } from "@/assets/js/group/GroupStoreDetail";
import { storeDetail } from "@/api/store";
import { reviewDetail } from "@/api/review";
import { groupDetail } from "@/api/group";

export default {
  data() {
    return {
      id: 0,
      name: "",
      storeInfo: [],
      reviewInfo: [],
      loadstatus: false,
      images: [],
      groupInfo: [],
      latitude: 0,
      longitude: 0,
      coordinate: false,
    };
  },
  components: {
    MenuList,
  },
  computed: {
    category() {
      return this.storeInfo.category
        ? this.storeInfo.category.replaceAll("|", ",")
        : "음식점";
    },
  },
  created() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.id = this.$router.history.current.params.id;
    this.name = this.$router.history.current.params.from;
    if (this.name === "feed") {
      this.loadReviewData(this.id);
    } else {
      this.loadStoreData(this.id);
    }
  },
  mounted() {
    init();
  },
  methods: {
    async loadStoreData(id) {
      try {
        const { data } = await storeDetail(id);
        this.storeInfo = data;
        this.images = this.storeInfo.menus ? this.storeInfo.menus : Array();
        this.images = this.images.map((ele) => ele.image);
        this.images.splice(0, 0, this.storeInfo.image);
        this.longitude = this.storeInfo.longitude;
        this.latitude = this.storeInfo.latitude;
        this.loadstatus = true;

        if (!this.longitude) {
          this.getCoordinate();
        } else {
          this.initMap();
        }
      } catch (error) {
        alert(error);
      }
    },
    async loadReviewData(id) {
      try {
        const { data } = await reviewDetail(id);
        this.reviewInfo = data;
        this.images = this.reviewInfo.image;
        this.latitude = this.reviewInfo.restaurant_info.latitude;
        this.longitude = this.reviewInfo.restaurant_info.longitude;
        if (this.reviewInfo.tags[0] === "[]") {
          this.reviewInfo.tags = "";
        }
        this.loadstatus = true;
        this.coordinate = true;

        this.loadGroupData(data.group);
      } catch (error) {
        alert(error);
      }
    },
    async loadGroupData(id) {
      try {
        const { data } = await groupDetail(id);
        this.groupInfo = data;

        this.groupInfo.members.map((ele) => (ele["state"] = true));

        if (this.groupInfo.members.length > 4) {
          this.groupInfo["abs_members"] = this.groupInfo.members.slice(0, 3);
          this.groupInfo["abs_members"].push({
            profile_img: "",
            length_num: this.groupInfo.members.length - 3,
            state: false,
          });
        } else {
          this.groupInfo["abs_members"] = this.groupInfo.members;
        }

        this.initMap();
      } catch (error) {
        alert(error);
      }
    },
    getCoordinate() {
      var mapContainer = document.querySelector("#map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(this.storeInfo.address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          this.latitude = coords.Ma;
          this.longitude = coords.La;
          this.initMap();
        }
      });
    },
    exitrecommendDetail() {
      this.$router.go(-1);
    },
    initMap() {
      var mapContainer = document.querySelector("#map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(this.latitude, this.longitude), // 지도의 중심좌표
          // center: new kakao.maps.LatLng(36.3885517, 127.34940130000001), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };
      var map = new kakao.maps.Map(mapContainer, mapOption);
      this.createMarker(map);
    },
    initPage() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    createMarker(map) {
      // 36.386595461878876, 127.34998863544777
      var markerPosition = new kakao.maps.LatLng(this.latitude, this.longitude);
      // var imageSrc = require('@/assets/image/placeholder.png'),
      //   imageSize = new kakao.maps.Size(20, 30),
      //   imageOption = { offset: new kakao.maps.Point(10, 30) };
      var imageSrc = require("@/assets/image/carrot.png"),
        imageSize = new kakao.maps.Size(30, 40),
        imageOption = { offset: new kakao.maps.Point(15, 40) };
      // 마커를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    },
    moveToReviewEdit() {
      this.$router.push({ name: "UpdateReview", params: { id: this.id } });
    },
  },
};
</script>

<style></style>
