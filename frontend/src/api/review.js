import { instance, instanceAuth } from '@/api';

const reviewsByMe = params => instanceAuth.get('reviews/', params);
const reviewDetail = reviewId => instanceAuth.get(`reviews/${reviewId}/`);
const reviewCreate = reviewData => instanceAuth.post(`reviews/`, reviewData);
const reviewUpdate = (reviewId, reviewData) => instanceAuth.put(`reviews/${reviewId}/`, reviewData);
const reviewDelete = reviewId => instanceAuth.delete(`reviews/${reviewId}/`);
// const getFeedForYou = params => instanceAuth.get(`feed/recomm/`, params);
const getFeedForYou = params => instanceAuth.get('feed/reply/', params);
const itemBased = () => instanceAuth.get('start/');
// TODO
// const getFeedForYou = (long, lat, address) => instanceAuth.get(`feed/taste/?long=${long}&lat=${lat}&address=${address}/`);
// 전국 인기 리뷰 불러오기
const getHotFeed = () => instance.get(`feed/popular/`);
const getThemeFeed = params => instance.get('feed/theme/', params); // params => {theme: String, page: Number, limit:Number, address:String, tag:String}

// review 북마크 토글하기
const toggleReviewBookmark = reviewId => instanceAuth.post(`bookmark/${reviewId}/`);
// const toggleReviewBookmark = reviewId => instanceAuth.post('bookmark/', reviewId);

export {
  reviewsByMe,
  reviewDetail,
  reviewCreate,
  reviewUpdate,
  reviewDelete,
  getFeedForYou,
  getHotFeed,
  itemBased,
  getThemeFeed,
  toggleReviewBookmark,
};
