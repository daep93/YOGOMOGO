const groupRoutes = [
  {
    path: '/group/page/:id',
    name: 'GroupPage',
    component: () => import('@/views/group/GroupPage.vue'),
    props: true,
  },
  {
    path: '/group/update/:id',
    name: 'GroupUpdate',
    component: () => import('@/views/group/GroupEditPage.vue'),
    props: true,
  },
  {
    path: '/group/create',
    name: 'CreateGroup',
    component: () => import('@/views/group/GroupEditPage.vue'),
  },
  {
    path: '/group/main',
    name: 'GroupMain',
    component: () => import('@/views/group/GroupMain.vue'),
  },
  {
    path: '/group/:from/detail/:id',
    name: 'GroupPopUP',
    component: () => import('@/views/group/GroupPopUp.vue'),
    props: true,
  },
  {
    path: '/group/:id/recommend/all',
    name: 'GroupRecommendAllPage',
    component: () => import('@/views/group/GroupRecommendAllPage.vue'),
    props: true,
  },
];
export { groupRoutes };
