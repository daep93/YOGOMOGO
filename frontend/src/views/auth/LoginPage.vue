<template>
  <section>
    <header>
      <h2 class="login_title">Welcome</h2>
      <h2 class="login_title2">Back!</h2>
      <p class="login_intro">로그인시 사용할 비밀번호를 입력해주세요</p>
    </header>
    <article>
      <div>
        <div class="input_title"><span>E-mail</span></div>
        <input
          type="email"
          placeholder="이메일 주소를 입력해주세요."
          id="email"
          autofocus
          v-model="email"
          :error="!isValidEmail"
        />
        <p class="error_message" v-if="!isValidEmail">
          잘못된 이메일 양식입니다.
        </p>
      </div>
      <br />
      <div>
        <div class="input_title"><span>Password</span></div>
        <input type="password" placeholder="비밀번호를 입력해주세요." v-model="password" />
        <p v-if="!isValidPwd && password.length < 6" class="error_message">6자 이상의 비밀번호를 입력해주세요.</p>
        <p v-else-if="!isValidPwd && password.length > 12" class="error_message">
          12자 이하의 비밀번호를 입력해주세요.
        </p>
      </div>
    </article>
    <div class="login_btn">
      <button class="login_button" :disabled="!checkForm" @click="submitForm">LOG IN</button>
    </div>
    <div class="login_signup-btn">
      <button class="login_signup-button" @click="goToSignup">SIGN UP</button>
    </div>
  </section>
</template>

<script>
import { validateEmail, validatePwd } from '@/utils/validation';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    isValidEmail() {
      return this.email === '' || validateEmail(this.email);
    },
    isValidPwd() {
      return this.password === '' || validatePwd(this.password);
    },
    checkForm() {
      return validateEmail(this.email) && validatePwd(this.password);
    },
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('LOGIN', {
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: 'Feed' });
      } catch (error) {
        alert('이메일이나 비밀번호를 다시 확인해주세요.');
      }
    },
    goToSignup() {
      this.$router.push('/signup/email');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/auth/LoginPage';
</style>
