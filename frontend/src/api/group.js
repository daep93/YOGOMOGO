import { instance, instanceAuth } from '@/api';
const groupList = () => instanceAuth.get('group/');
const groupDetail = groupId => instance.get(`group/${groupId}/`); // groupId : 조회하고 싶은 그룹 아이디
const groupCreate = groupData => instanceAuth.post('group/', groupData); // groupData => {name: String, img: URL, members: [userId]}
const groupUpdate = (groupId, groupData) => instanceAuth.put(`group/${groupId}/`, groupData); // groupId: 수정하고 싶은 그룹 아이디, groupData => {name: String, img: URL, members: [userId]} *부분 수정 허용*
const groupDelete = groupId => instanceAuth.delete(`group/${groupId}/`); // groupId : 삭제하고 싶은 그룹 아이디

const groupReviewList = (groupId, params) => instance.get(`group/review/${groupId}/`, { params }); // groupId: 리뷰들을 모아 볼 그룹 아이디 , params => {page: 페이지, limit: 불러올 목록 단위, ord: 정렬 방법(asc, desc)}
// const groupReviewList = params => instance.get(`group/review/`, {params}); // groupId: 리뷰들을 모아 볼 그룹 아이디 , params => {page: 페이지, limit: 불러올 목록 단위, ord: 정렬 방법(asc, desc)}

const groupRecommends = (groupId, params) => instanceAuth.get(`group/recomm-stores/${groupId}/`, { params }); // groupId: 추천받을 그룹의 아이디
export { groupList, groupDetail, groupCreate, groupUpdate, groupDelete, groupReviewList, groupRecommends };
