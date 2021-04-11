<template>
  <section>
    <header>
      <h2 class="signup_title">Enter your</h2>
      <h2 class="signup_title2">Username</h2>
      <p class="signup_intro">나만의 유니크란 닉네임을 입력해주세요</p>
    </header>
    <article>
      <div>
        <div class="signup_label"></div>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          autofocus
          v-model="username"
          @input="userRedundancy = true"
        />
        <p v-if="!username" class="error_message"></p>
        <p v-else-if="!userRedundancy" class="error_message">사용 가능한 유저이름입니다</p>
      </div>
      <div class="signup_btn">
        <button v-if="userRedundancy" class="signup_button" @click="checkUsername">중복확인</button>
        <button v-else class="signup_button" @click="checkUsername">중복확인 완료</button>
      </div>
    </article>
    <button @click="goToSignupEmail" class="back_btn">BACK</button>
    <button @click="goToSignupPassword" class="next_btn">NEXT</button>
  </section>
</template>

<script>
import { usernameCheck } from '@/api/auth';
export default {
  data() {
    return {
      username: this.$route.query.username,
      userRedundancy: true,
      email: this.$route.query.email,
    };
  },
  computed: {
    checkForm() {
      return this.username !== '' && !this.userRedundancy;
    },
  },
  methods: {
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
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignupEmail() {
      this.$router.push({ path: '/signup/email', query: { username: this.username, email: this.email } });
    },
    goToSignupPassword() {
      if (!this.userRedundancy) {
        this.$router.push({ path: '/signup/password', query: { username: this.username, email: this.email } });
      } else alert('닉네임 중복 검사를 진행해주세요');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/auth/SignupUsernamePage';
</style>
