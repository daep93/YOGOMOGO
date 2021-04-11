import store from '@/store';
const beforeEnterWrapper = msg => (to, from, next) => {
  if (!store.state.email) {
    alert(msg);
    next('/login');
    return;
  } else {
    next();
  }
};
const profileRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/ProfilePage.vue'),
    beforeEnter: beforeEnterWrapper('로그인이 필요합니다.'),
  },
  {
    path: '/bookmark',
    name: 'Bookmark',
    component: () => import('@/views/common/BookmarkPage.vue'),
    beforeEnter: beforeEnterWrapper('로그인이 필요합니다.'),
  },
  {
    path: '/profile-setting',
    name: 'ProfileSetting',
    component: () => import('@/views/profile/ProfileSettingPage.vue'),
    beforeEnter: beforeEnterWrapper('로그인이 필요합니다.'),
  },
];
export { profileRoutes };
