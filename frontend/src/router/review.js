const reviewRoutes = [
  {
    path: '/review/create',
    name: 'CreateReview',
    component: () => import('@/views/review/ReviewEditPage.vue'),
  },
  {
    path: '/review/update/:id',
    name: 'UpdateReview',
    component: () => import('@/views/review/ReviewEditPage.vue'),
  },
  {
    path: '/review/detail/:id',
    name: 'ReviewDetail',
    component: () => import('@/views/review/ReviewDetailPage.vue'),
  },
];
export { reviewRoutes };
