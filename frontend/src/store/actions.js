import { loginUser } from '@/api/auth';
import {
  saveAuthToCookie,
  saveUserIdToCookie,
  saveUserNameToCookie,
  saveUserEmailToCookie,
  saveUserLocationToCookie,
  saveUserImgFromCookie,
} from '@/utils/cookies';

export default {
  async LOGIN({ commit }, userData) {
    const { data } = await loginUser(userData);
    commit('setUserId', data.id);
    commit('setUsername', data.username);
    commit('setUserEmail', data.email);
    commit('setUserLocation', data.region);
    commit('setToken', data.token);
    commit('setImg', data.profile_img);

    // 쿠키에 저장
    saveUserIdToCookie(data.id);
    saveUserNameToCookie(data.username);
    saveUserEmailToCookie(data.email);
    saveUserLocationToCookie(data.region);
    saveAuthToCookie(data.token);
    saveUserImgFromCookie(data.profile_img);
    return data;
  },

  async LOGOUT({ commit }) {
    commit('setUserId', '');
    commit('setUsername', '');
    commit('setUserEmail', '');
    commit('setToken', '');
    commit('setUserLocation', '');
    commit('setImg', '');
    saveUserIdToCookie('');
    saveUserNameToCookie('');
    saveUserEmailToCookie('');
    saveAuthToCookie('');
    saveUserLocationToCookie('');
    saveUserImgFromCookie('');
  },
};
