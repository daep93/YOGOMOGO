<template>
  <div class="drawer--contents">
    <!-- 프로필 이미지 -->
    <section class="profile--container">
      <div class="img--container" @click="moveToPage('Profile')">
        <img :src="profileImg ? profileImg : require('@/assets/image/profile_basic.png')" />
      </div>
      <div class="info--container">
        <div>{{ username }}</div>
        <div>{{ email }}</div>
      </div>
    </section>
    <!-- 네비게이션 -->
    <section class="nav--list">
      <div class="nav--wrapper" @click="moveToPage('GroupMain')">
        <div class="nav--icon">
          <span class="material-icons">
            groups
          </span>
        </div>
        <div class="nav--info">Groups</div>
      </div>
      <div class="nav--wrapper" @click="moveToPage('Feed')">
        <div class="nav--icon">
          <span class="material-icons">
            ballot
          </span>
        </div>
        <div class="nav--info">Feed</div>
      </div>
      <div class="nav--wrapper" @click="moveToPage('CreateGroup')">
        <div class="nav--icon">
          <span class="material-icons">
            group_add
          </span>
        </div>
        <div class="nav--info">Create Group</div>
      </div>
      <div class="nav--wrapper" @click="moveToPage('Friendship')">
        <div class="nav--icon">
          <span class="material-icons">
            group
          </span>
        </div>
        <div class="nav--info">Friends</div>
      </div>
      <div class="nav--wrapper" @click="moveToPage('CreateReview')">
        <div class="nav--icon">
          <span class="material-icons">
            rate_review
          </span>
        </div>
        <div class="nav--info">Create review</div>
      </div>
      <div class="drawer--under" @click="logout">
        <div class="nav--icon">
          <span class="material-icons">
            logout
          </span>
        </div>
        <div class="nav--info">Logout</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    profileImg() {
      return this.$store.state.profileImg;
    },
    username() {
      return this.$store.state.username;
    },
    email() {
      return this.$store.state.email;
    },
  },
  methods: {
    moveToPage(page) {
      this.$store.commit('toggleDrawerOpen');
      this.$router.push({ name: page });
    },
    logout() {
      this.$store.dispatch('LOGOUT');
      alert('로그아웃 되었습니다.');
      this.moveToPage('LoginPage');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common/SideDrawer';
</style>
