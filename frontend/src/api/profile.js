import { instance, instanceAuth } from '@/api';
const profileDetail = uesrId => instance.get(`user/profiles/${uesrId}/`); // uesrId : 조회하고 싶은 user 아이디
// const profileUpdate = userData => instanceAuth.patch(`user/profiles/1/`, userData); // userData => {region} (임시)

// 충돌나도 지우지 말아주세요
const profileUpdate = profileData => instanceAuth.put(`user/profiles/1/`, profileData);

const mealCount = () => instanceAuth.post('monthly/');
const getBookmarkedList = params => instanceAuth.get(`bookmark/`, params);

export { profileDetail, profileUpdate, getBookmarkedList, mealCount };
