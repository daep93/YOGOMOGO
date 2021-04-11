import Vue from 'vue';
import VueRouter from 'vue-router';
import { authRoutes } from '@/router/auth';
import { feedRoutes } from '@/router/feed';
import { friendRoutes } from '@/router/friend';
import { groupRoutes } from '@/router/group';
import { profileRoutes } from '@/router/profile';
import { reviewRoutes } from '@/router/review';
import { storeRoutes } from '@/router/store';
import { etcRoutes } from '@/router/etc';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },

  ...authRoutes,
  ...feedRoutes,
  ...friendRoutes,
  ...groupRoutes,
  ...profileRoutes,
  ...reviewRoutes,
  ...storeRoutes,
  ...etcRoutes,
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
