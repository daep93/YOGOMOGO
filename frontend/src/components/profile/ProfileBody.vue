<template>
  <div class="profile--body">
    <article class="profile--img">
      <img :src="profile.profileImg ? profile.profileImg : require('@/assets/image/profile_basic.png')" />
    </article>
    <article class="profile--info">
      <div class="profile--name">{{ $store.state.username }}</div>
      <div class="profile--msg">{{ status_msg }}</div>
      <div class="profile--statics">
        <div class="meal--wrapper">
          <div>{{ meals }}</div>
          <div>이번 달 한끼 횟수</div>
        </div>
        <div class="review--number--wrapper">
          <div>{{ totalReviewNum }}</div>
          <div>리뷰 수</div>
        </div>
      </div>
    </article>
    <profile-group-list></profile-group-list>
    <profile-review-list @totalCount="totalCount"></profile-review-list>
  </div>
</template>

<script>
import ProfileGroupList from '@/components/profile/ProfileGroupList';
import ProfileReviewList from '@/components/profile/ProfileReviewList';
import { friendList } from '@/api/friend';
import { profileDetail, mealCount } from '@/api/profile';
export default {
  components: {
    ProfileGroupList,
    ProfileReviewList,
  },
  data() {
    return {
      profile: {},
      loaded: false,
      meals: 0,
      totalReviewNum: 0,
      status_msg: '',
    };
  },
  methods: {
    totalCount(num) {
      this.totalReviewNum = num;
    },
    async loadProfile() {
      try {
        const id = this.$store.state.id;
        const { data } = await profileDetail(id);
        this.profile = {
          friends: data.friends,
          groups: data.groups,
          profileImg: data.profile_img,
        };
        this.status_msg = data.status_msg;
        const response = await mealCount();
        this.meals = response.data;
        this.loaded = true;
      } catch (error) {
        alert(error);
      }
    },
    async getFriends() {
      try {
        const { data } = await friendList(this.$store.state.id);
        this.friends = data.friends;
        if (this.friends.length > 0) {
          this.checkFriend();
        } else {
          this.checkFriendStatus = false;
        }
      } catch (error) {
        alert(error);
      }
    },
  },
  created() {
    this.loadProfile();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/profile/ProfileBody';
</style>
