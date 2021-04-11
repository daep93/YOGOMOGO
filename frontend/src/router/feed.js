const feedRoutes = [
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('@/views/feed/FeedPage.vue'),
  },
  {
    path: '/feed/hot',
    name: 'HotFeed',
    component: () => import('@/views/feed/TotalHotFeedPage.vue'),
  },
  {
    path: '/feed/for/you',
    name: 'FeedForYou',
    component: () => import('@/views/feed/TotalFeedForYouPage.vue'),
  },
  {
    // theme에는 family, friend, lover, meetup 만 들어갈 수 있습니다.
    path: '/feed/theme/:theme',
    name: 'ThemeFeed',
    component: () => import('@/views/feed/ThemeFeedPage.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      const themeOption = ['family', 'lover', 'friend', 'meetup'];
      if (themeOption.indexOf(to.params.theme) !== -1) next();
      else alert('올바른 테마가 아닙니다!');
    },
  },
];
export { feedRoutes };
