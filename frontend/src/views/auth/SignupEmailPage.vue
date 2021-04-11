<template>
  <section>
    <header>
      <h2 class="signup_title">Enter your</h2>
      <h2 class="signup_title2">Email</h2>
      <p class="signup_intro">로그인시 사용할 이메일을 입력해주세요</p>
    </header>
    <article>
      <div>
        <input
          type="email"
          placeholder="이메일 주소를 입력해주세요."
          autofocus
          v-model="email"
          :error="!isValidEmail"
          @input="emailRedundancy = true"
        />
        <p v-if="!email" class="error_message"></p>
        <p v-else-if="!isValidEmail" class="error_message">
          잘못된 이메일 양식입니다.
        </p>
        <p v-else-if="isValidEmail" class="error_message">
          사용 가능한 메일 양식입니다 :)
        </p>
      </div>
      <div class="signup_btn">
        <button :disabled="!isValidEmail" v-if="emailRedundancy" @click="checkEmail" class="signup_button">
          중복확인
        </button>
        <button v-else class="signup_button">중복확인 완료</button>
      </div>
    </article>
    <button @click="goToLogin" class="back_btn">BACK</button>
    <button @click="goToSignupUsername" class="next_btn">NEXT</button>
  </section>
</template>

<script>
import { emailCheck } from '@/api/auth';
import { validateEmail } from '@/utils/validation';
export default {
  name: 'SignupEmailPage',
  data() {
    return {
      email: this.$route.query.email,
      emailRedundancy: true,
      username: this.$route.query.username,
    };
  },
  computed: {
    isValidEmail() {
      return this.email === '' || validateEmail(this.email);
    },
    checkForm() {
      return validateEmail(this.email) && !this.emailRedundancy;
    },
  },
  methods: {
    async checkEmail() {
      try {
        let { data } = await emailCheck({
          params: {
            email: this.email,
          },
        });
        this.emailRedundancy = data.redundancy;
        if (this.emailRedundancy) {
          alert('이미 존재하는 이메일 주소입니다.');
        }
      } catch (error) {
        alert(error);
      }
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignupUsername() {
      if (this.isValidEmail && !this.emailRedundancy) {
        this.$router.push({ path: '/signup/username', query: { email: this.email, username: this.username } });
      } else {
        alert('중복 확인을 진행해주세요');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/auth/SignupEmailPage';
</style>
