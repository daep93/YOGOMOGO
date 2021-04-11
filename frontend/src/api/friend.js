import { instance, instanceAuth } from '@/api';
const friendReqList = () => instanceAuth.get('user/friend_req');
// 친구가 되고 싶으면 먼저 요청을 보낼 것
const friendRequest = userData => instanceAuth.post(`user/friend_req/`, userData); // userData => {sendTo : userId}
const friendReqDelete = userNumber => instanceAuth.delete(`user/friend_req/${userNumber}/`); // userNumber: 삭제할 요청자 아아디
const friendList = userNumber => instance.get(`user/friends/${userNumber}/`); // userNumber : 조회하고 싶은 user 아이디
// 요청을 받은 사람만이 친구 수락이 가능
const friendCreate = userData => instanceAuth.post(`user/friends/`, userData); // userData => {friend : userId}
const friendDelete = userNumber => instanceAuth.delete(`user/friends/${userNumber}`); // userNumber : 삭제할 친구 아이디
export { friendCreate, friendDelete, friendList, friendRequest, friendReqList, friendReqDelete };
