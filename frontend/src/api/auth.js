import { instance, instanceAuth } from '@/api';

const registerUser = userData => instance.post('user/register', userData); // userData => {email, username, password}
const loginUser = userData => instance.post('user/login', userData); // userData => {email, password}
const resetPwdAuthWithEmail = userData => instance.post('user/password_reset', userData); //userData =>{email}
const resetPwd = userData => instanceAuth.put('user/reset_pwd/1/', userData); //userData =>{password}
const emailCheck = params => instance.get('user/email-check', params); // params =>{email}
const usernameCheck = params => instance.get('user/username-check', params); // params =>{email}

const sendBestRestaurant = userData => instanceAuth.post('my-best-restaurant/', userData);

const usernameSearch = params => instanceAuth.get('user/', params); // params =>{search}
export {
  registerUser,
  loginUser,
  resetPwdAuthWithEmail,
  resetPwd,
  emailCheck,
  usernameCheck,
  sendBestRestaurant,
  usernameSearch,
};
