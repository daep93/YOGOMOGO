<template>
  <section class="profile--container">
    <header>
      <span class="material-icons more--option" @click="optionDisplay = true">
        more_horiz
      </span>
      <div class="option--display" v-show="optionDisplay">
        <div class="option--row" @click="moveToPage('ProfileSetting')">
          <div>
            <div class="material-icons">
              auto_fix_high
            </div>
          </div>
          <div>프로필 수정</div>
        </div>
        <div class="option--row" @click="moveToPage('Bookmark')">
          <div>
            <span class="material-icons">
              bookmarks
            </span>
          </div>
          <div>북마크</div>
        </div>
        <div class="option--row" @click="moveToPage('Friendship')">
          <div>
            <span class="material-icons">
              people_alt
            </span>
          </div>
          <div>친구 목록</div>
        </div>
      </div>
      <section class="option--overlay" v-show="optionDisplay" @click="optionDisplay = false"></section>
    </header>
    <profile-body></profile-body>
  </section>
</template>

<script>
import ProfileBody from '@/components/profile/ProfileBody';

export default {
  components: {
    ProfileBody,
  },
  data() {
    return {
      optionDisplay: false,
    };
  },
  methods: {
    moveToPage(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/profile/ProfilePage';
</style>
