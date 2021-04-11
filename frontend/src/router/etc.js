const etcRoutes = [
  {
    path: '/random/board',
    name: 'RandomBoardPage',
    component: () => import('@/views/group/RandomBoardPage.vue'),
    props: true,
  },
];
export { etcRoutes };
