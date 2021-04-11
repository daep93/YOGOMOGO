<template>
  <div>
    <span class="material-icons daheze" v-if="this.$store.state.email" @click="$store.commit('toggleDrawerOpen')">
      dehaze
    </span>
    <transition name="drawer">
      <div class="drawer--container" v-show="drawerOpen">
        <side-drawer></side-drawer>
      </div>
    </transition>
    <div class="drawer--overlay" v-show="drawerOpen" @click="$store.commit('toggleDrawerOpen')"></div>
    <router-view />
    <!-- <nav-bar></nav-bar> -->
  </div>
</template>

<script>
import '@/assets/css/common/reset.css';
import SideDrawer from '@/components/common/SideDrawer';
export default {
  computed: {
    drawerOpen() {
      return this.$store.state.drawerOpen;
    },
  },
  components: {
    SideDrawer,
  },
};
</script>

<style lang="scss">
body {
  font-family: $web-font-family;
}
.daheze {
  position: absolute;
  top: 10px;
  left: 20px;
  color: $pink;
  z-index: 9999;
}
.drawer-enter-active {
  animation: slide-in 0.3s;
}
.drawer-leave-active {
  animation: slide-in 0.3s reverse;
}
@keyframes slide-in {
  from {
    transform: translateX(-300px);
  }
  to {
    transform: translateX(0);
  }
}
.drawer--container {
  position: fixed;
  max-width: 300px;
  width: 90vw;
  height: 100vh;
  background-color: black;
  z-index: 9998;
  padding: 50px 20px;
  box-sizing: border-box;
}
.drawer--overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 9997;
  background-color: rgba(0, 0, 0, 0.6);
  transition: background-color 1s ease;
}
</style>
