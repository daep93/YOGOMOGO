<template>
  <section>
    <header>
      <h2 class="signup_title">Enter your</h2>
      <h2 class="signup_title2">Password</h2>
      <p class="signup_intro">로그인시 사용할 비밀번호를 입력해주세요</p>
    </header>
    <article>
      <div>
        <div class="signup_label"><span>Password</span></div>
        <input type="password" placeholder="6~12자의 영문, 숫자 입력" autofocus v-model="password1" />
        <p v-if="!isValidPwd && password1.length < 6" class="error_message">6자 이상의 비밀번호를 입력해주세요.</p>
        <p v-else-if="!isValidPwd && password1.length > 12" class="error_message">
          12자 이하의 비밀번호를 입력해주세요.
        </p>
      </div>
      <br />
      <div>
        <div class="signup_label"><span>Confirm Password</span></div>
        <input type="password" placeholder="비밀번호를 다시 입력해주세요." v-model="password2" />
        <p v-if="!isValidPwdConfirm" class="error_message">
          다시 비밀번호를 확인해주세요.
        </p>
        <p v-else-if="password2.length === 0" class="error_message"></p>
        <p v-else-if="isValidPwdConfirm" class="error_message">비밀번호가 일치합니다!</p>
      </div>
    </article>
    <button @click="goToSignupUsername" class="back_btn">BACK</button>
    <button @click="submitForm" class="next_btn">SIGN UP</button>
  </section>
</template>

<script>
import { registerUser } from '@/api/auth';
import { validatePwd } from '@/utils/validation';
export default {
  data() {
    return {
      username: this.$route.query.username,
      email: this.$route.query.email,
      password1: '',
      password2: '',
      userRedundancy: true,
      emailRedundancy: true,
    };
  },
  computed: {
    isValidPwd() {
      return this.password1 === '' || validatePwd(this.password1);
    },
    isValidPwdConfirm() {
      return this.password2 === '' || this.password1 === this.password2;
    },
    checkForm() {
      return validatePwd(this.password1) && this.password1 === this.password2;
    },
  },
  methods: {
    async submitForm() {
      if (this.checkForm) {
        try {
          await registerUser({
            email: this.email,
            username: this.username,
            password: this.password1,
          });
          await this.$store.dispatch('LOGIN', {
            email: this.email,
            password: this.password1,
          });
          this.$router.push({ name: 'MyBestRestaurant' });
        } catch (error) {
          alert(error);
        }
      } else {
        alert('비밀번호를 입력해주세요');
      }
    },
    goToSignupUsername() {
      this.$router.push({ path: '/signup/username', query: { username: this.username, email: this.email } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/auth/SignupPasswordPage';
</style>
