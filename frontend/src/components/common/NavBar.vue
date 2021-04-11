<template>
  <div class="nav__wrapper">
    <ul class="nav__buttons">
      <router-link to="/group/main" class="button__box"><img src="@/assets/image/house.png" alt=""/></router-link>
      <router-link to="/friendship" class="button__box"><img src="@/assets/image/movies-app.png" alt=""/></router-link>
      <router-link to="/review/create" class="button__box"><img src="@/assets/image/notes.png" alt=""/></router-link>
      <router-link :to="`/profile/${userId}`" class="button__box"
        ><img src="@/assets/image/user.png" alt=""
      /></router-link>
    </ul>
  </div>
</template>

<script>
import init from '@/assets/js/common/NavBar';
export default {
  computed: {
    userId() {
      return this.$store.state.id;
    },
  },
  mounted() {
    init.init();
  },
};
</script>

<style src="@/assets/css/common/NavBar.css"></style>
