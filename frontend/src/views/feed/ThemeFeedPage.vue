<template>
  <div>
    <!-- 최상단 현재 위치 받기 -->
    <header class="top--navigation">
      <div>
        <i class="fas fa-map-marker-alt"></i>
        <span @click="onModal">{{ addr }}</span>
      </div>
    </header>
    <section class="theme--container" v-if="sw">
      <div class="to--feed--page" @click="$router.push({ name: 'Feed' })">
        <i class="fas fa-chevron-left fa-lg"></i>
      </div>
      <h1>{{ themeTrans }} 테마 리뷰</h1>
      <h3>{{ themeTrans }} 테마 리뷰만 모아서 준비했어요!</h3>
      <theme-feed :theme="themeTrans"></theme-feed>
    </section>
    <set-road-name v-show="loaded" @newAddress="setAddress"></set-road-name>
  </div>
</template>

<script>
import ThemeFeed from '@/components/feed/theme/ThemeFeed';
import SetRoadName from '@/components/common/SetRoadName';
import { profileUpdate } from '@/api/profile';
import { saveUserLocationToCookie, deleteCookie } from '@/utils/cookies';
export default {
  props: {
    theme: {
      type: String,
      require: true,
      validator: function(value) {
        return ['family', 'lover', 'meetup', 'friend'].indexOf(value) !== -1;
      },
    },
  },
  components: {
    ThemeFeed,
    SetRoadName,
  },
  data() {
    const themeOption = {
      family: '가족',
      lover: '연인',
      meetup: '회식',
      friend: '친구',
    };
    return {
      loaded: false,
      sw: true,
      addr: this.$store.state.location,
      themeTrans: themeOption[this.theme],
    };
  },
  methods: {
    onModal() {
      this.loaded = true;
    },
    async setAddress(address) {
      if (address) {
        this.addr = address;
        deleteCookie('login_location');
        saveUserLocationToCookie(address);
        this.$store.commit('setUserLocation', address);
        await profileUpdate({
          region: address,
        });
      }
      this.loaded = false;
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/ThemeFeedPage';
</style>
