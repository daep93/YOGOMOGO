<template>
  <section class="myBestRestaurant_all">
    <loading-spinner v-if="!loaded"></loading-spinner>
    <header>
      <h2 class="title">Select</h2>
      <h2 class="title2">Your Favorite</h2>
      <p class="intro">인생 맛집 5개를 선택해주세요!</p>
    </header>
    <article>
      <search v-if="loaded" :location="location"></search>
    </article>
  </section>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Search from '@/components/myBestRestaurant/Search';
import { profileUpdate } from '@/api/profile';
import { saveUserLocationToCookie } from '@/utils/cookies';
export default {
  components: {
    Search,
    LoadingSpinner,
  },
  data() {
    return {
      location: [],
      loaded: false,
    };
  },
  created() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        let geocoder = new kakao.maps.services.Geocoder();
        let coord = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.location.push(position.coords.latitude);
        this.location.push(position.coords.longitude);
        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            saveUserLocationToCookie(address);
            this.$store.commit('setUserLocation', address);
            profileUpdate({
              region: address,
            });
          }
        });
        this.loaded = true;
      });
    } else {
      /* 위치정보 사용 불가능 */
    }
  },
};
</script>

<style scoped>
.myBestRestaurant_all {
  padding: 45px;
  background-color: black;
  min-height: 120vh;
}
/* article {
  margin-bottom: 51%;
} */
.title {
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
  margin-top: 40px;
}
.title2 {
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin-bottom: 25px;
}
.intro {
  font-size: 12px;
  color: #ff7373;
  margin-bottom: 55px;
}
</style>
