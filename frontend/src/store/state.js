import {
  getAuthFromCookie,
  getUserIdFromCookie,
  getUserEmailFromCookie,
  getUserNameFromCookie,
  getUserLocationFromCookie,
  getUserImgFromCookie,
} from '@/utils/cookies';

export default {
  id: getUserIdFromCookie() || '',
  email: getUserEmailFromCookie() || '',
  username: getUserNameFromCookie() || '',
  token: getAuthFromCookie() ? `Token ${getAuthFromCookie()}` : '',
  location: getUserLocationFromCookie() || '',
  profileImg: getUserImgFromCookie() || '',
  drawerOpen: false,
};
