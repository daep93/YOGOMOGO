import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);
import { formatNumber } from '@/utils/filters';
Vue.filter('formatNumber', formatNumber);
import Dayjs from 'vue-dayjs';
Vue.use(Dayjs, {
  lang: 'en',
  filters: {
    ago: 'ago',
  },
  directives: {
    countdown: 'countdown',
  },
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
