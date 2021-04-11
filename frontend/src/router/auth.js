import store from '@/store';
const beforeEnterWrapper = msg => (to, from, next) => {
  if (store.state.email) {
    alert(msg);
    next('feed/');
    return;
  } else {
    next();
  }
};
const authRoutes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/auth/LoginPage.vue'),
    beforeEnter: beforeEnterWrapper('이미 로그인되어 있습니다.'),
  },
  // {
  //   path: '/signup',
  //   name: 'SignupPage',
  //   component: () => import('@/views/auth/SignupPage.vue'),
  // },
  {
    path: '/signup/username',
    name: 'SignupUsernamePage',
    component: () => import('@/views/auth/SignupUsernamePage.vue'),
    beforeEnter: beforeEnterWrapper('로그아웃을 하고 진행해주세요.'),
  },
  {
    path: '/signup/email',
    name: 'SignupEmailPage',
    component: () => import('@/views/auth/SignupEmailPage.vue'),
    beforeEnter: beforeEnterWrapper('로그아웃을 하고 진행해주세요.'),
  },
  {
    path: '/signup/password',
    name: 'SignupPasswordPage',
    component: () => import('@/views/auth/SignupPasswordPage.vue'),
    beforeEnter: beforeEnterWrapper('로그아웃을 하고 진행해주세요.'),
  },
  {
    path: '/my-best-restaurant',
    name: 'MyBestRestaurant',
    component: () => import('@/views/auth/MyBestRestaurantPage.vue'),
  },
  {
    path: '/change-password',
    name: 'ChangePasswordPage',
    component: () => import('@/views/auth/ChangePasswordPage.vue'),
    beforeEnter: beforeEnterWrapper('로그아웃을 하고 진행해주세요.'),
  },
];
export { authRoutes };
