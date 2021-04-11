<template>
  <section>
    <header>
      <h2 class="singup_title">Sign up</h2>
    </header>
    <article>
      <div>
        <div class="signup_label">
          <span>Username</span>
          <span v-if="userRedundancy" class="before_redundancy_check" @click="checkUsername">중복확인</span>
          <span v-else class="after_redundancy_check" @click="checkUsername">중복확인 완료</span>
        </div>
        <i class="fas fa-user"></i>
        <input type="text" placeholder="닉네임을 입력해주세요." v-model="username" @input="userRedundancy = true" />
      </div>

      <div>
        <div class="signup_label">
          <span>E-mail</span>
          <span v-if="emailRedundancy" class="before_redundancy_check" @click="checkEmail">중복확인</span>
          <span v-else class="after_redundancy_check" @click="checkEmail">중복확인 완료</span>
        </div>
        <i class="fas fa-envelope"></i>
        <!-- TODO: 질문 -->
        <input
          type="email"
          placeholder="이메일 주소를 입력해주세요."
          v-model="email"
          :error="!isValidEmail"
          @input="emailRedundancy = true"
        />
        <p v-if="!isValidEmail" class="error_message">
          잘못된 이메일 양식입니다.
        </p>
      </div>

      <div>
        <div class="signup_label"><span>Password</span></div>
        <i class="fas fa-lock"></i>
        <input type="password" placeholder="6~12자의 영문, 숫자 입력" v-model="password1" />
        <p v-if="!isValidPwd && password1.length < 6" class="error_message">6자 이상의 비밀번호를 입력해주세요.</p>
        <p v-else-if="!isValidPwd && password1.length > 12" class="error_message">
          12자 이하의 비밀번호를 입력해주세요.
        </p>
      </div>
      <div>
        <div class="signup_label"><span>Confirm Password</span></div>
        <i class="fas fa-lock"></i>
        <input type="password" placeholder="비밀번호를 다시 입력해주세요." v-model="password2" />
        <p v-if="!isValidPwdConfirm" class="error_message">
          다시 비밀번호를 확인해주세요.
        </p>
      </div>
    </article>
    <button :disabled="!checkForm" @click="submitForm">회원가입하기</button>
    <p class="go_login" @click="goToLogin">로그인</p>
  </section>
</template>

<script>
import { registerUser, usernameCheck, emailCheck } from '@/api/auth';
import { validateEmail, validatePwd } from '@/utils/validation';
export default {
  data() {
    return {
      email: '',
      username: '',
      password1: '',
      password2: '',
      userRedundancy: true,
      emailRedundancy: true,
    };
  },
  computed: {
    isValidEmail() {
      return this.email === '' || validateEmail(this.email);
    },
    isValidPwd() {
      return this.password1 === '' || validatePwd(this.password1);
    },
    isValidPwdConfirm() {
      return this.password2 === '' || this.password1 === this.password2;
    },
    checkForm() {
      return (
        validateEmail(this.email) &&
        validatePwd(this.password1) &&
        this.password1 === this.password2 &&
        this.username !== '' &&
        !this.userRedundancy &&
        !this.emailRedundancy
      );
    },
  },
  methods: {
    async submitForm() {
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
        // } else {
        //   alert('중복 확인을 진행해주세요.');
        // }
      } catch (error) {
        alert(error);
      }
    },
    goToLogin() {
      this.$router.push({ name: 'LoginPage' });
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
  },
};
</script>

<style scoped>
section {
  padding: 30px;
}
article {
  padding-left: 20px;
  margin-bottom: 40px;
}
article > div {
  margin-bottom: 25px;
}
i {
  width: 16px;
  margin-right: 10px;
}
input {
  width: 200px;
}
button {
  margin-left: 46px;
  margin-bottom: 20px;
}
.singup_title {
  font-size: 20px;
  font-weight: bold;
  color: #434343;
  margin-bottom: 40px;
}
.signup_label {
  margin-bottom: 5px;
  font-size: 15px;
  color: #434343;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 226px;
}
.before_redundancy_check {
  color: red;
  font-size: 10px;
  margin-left: 10px;
}
.after_redundancy_check {
  color: blue;
  font-size: 10px;
  margin-left: 10px;
}
.error_message {
  position: absolute;
  font-size: 10px;
  color: red;
  margin: 5px 0 0 26px;
}
.go_login {
  color: blue;
  padding-left: 20px;
}
</style>
