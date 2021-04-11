<template>
  <section>
    <header class="settings_header">
      <div>Profile</div>
      <div>Settings</div>
      <div>프로필을 변경할 수 있습니다 :)</div>
    </header>
    <article>
      <div class="settings_img">
        <img :src="profile_img ? profile_img : require('@/assets/image/profile_basic.png')" />
        <div>
          <label>
            <i class="fas fa-pen" @click="onClickImageUpload"></i>
          </label>
          <input ref="imageInput" type="file" hidden @change="onChangeImages" />
        </div>
      </div>

      <p class="settings_title">
        닉네임<span v-if="userRedundancy" class="before_redundancy_check" @click="checkUsername">중복확인</span>
        <span v-else class="after_redundancy_check" @click="checkUsername">중복확인 완료</span>
      </p>
      <input v-model="username" type="text" class="settings_input_username" />

      <div>
        <p class="settings_title">상태메시지</p>
        <textarea
          cols="30"
          rows="10"
          v-model="status_msg"
          class="settings_input_intro"
          maxlength="20"
          @keyup="checkMsgLength"
        ></textarea>
      </div>
    </article>
    <button class="settings_button" @click="completeUpdate">수정하기</button>
  </section>
</template>

<script>
import { saveUserNameToCookie, saveUserImgFromCookie } from '@/utils/cookies';
import { profileDetail, profileUpdate } from '@/api/profile';
import { usernameCheck } from '@/api/auth';
import { uploadImg } from '@/api/image';

export default {
  data() {
    return {
      username: '',
      status_msg: '',
      profile_img: '',
      file: '',
      changeImage: false,
      userRedundancy: true,
      usernameChange: true,
    };
  },
  computed: {
    checkLength() {
      return this.status_msg.length;
    },
  },
  methods: {
    checkMsgLength() {
      if (this.checkLength > 19) {
        alert('20자 이하로 입력해주세요.');
      }
    },
    changeToBasicImage() {
      this.profile_img = '';
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      this.file = e.target.files[0];
      this.profile_img = URL.createObjectURL(this.file);
    },
    moveToProfilePage() {
      this.$router.push(`/profile`);
    },
    recognizeChanging() {
      if (this.userRedundancy && this.username !== this.$store.state.username) {
        alert('중복 확인을 진행해주세요.');
        this.usernameChange = false;
      } else if (!this.userRedundancy && this.username === this.$store.state.username) {
        this.usernameChange = true;
      } else {
        this.usernameChange = true;
      }
    },
    async completeUpdate() {
      this.recognizeChanging();
      if (this.usernameChange) {
        try {
          if (this.file) {
            const frm = new FormData();
            frm.append('image', this.file);
            const { data } = await uploadImg(frm);
            this.profile_img = data.image;
          }
          await profileUpdate({
            username: this.username,
            status_msg: this.status_msg,
            profile_img: this.profile_img,
          });
          saveUserNameToCookie(this.username);
          saveUserImgFromCookie(this.profile_img);
          this.$store.state.username = this.username;
          this.$store.state.profile_img = this.profile_img;
          alert('프로필 수정 완료');
          this.$router.push(`/profile`);
          location.reload();
        } catch (error) {
          alert(error);
        }
      }
    },
    async checkUsername() {
      try {
        let { data } = await usernameCheck({
          params: {
            username: this.username,
          },
        });
        this.userRedundancy = data.redundancy;
        if (this.userRedundancy) {
          alert('이미 존재하는 닉네임입니다.');
        }
      } catch (error) {
        alert(error);
      }
    },
  },
  async created() {
    try {
      const { data } = await profileDetail(this.$store.state.id);
      this.username = data.user.username;
      this.status_msg = data.status_msg;
      this.profile_img = data.profile_img;
    } catch (error) {
      alert(error);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/profile/ProfileSettings';
</style>
