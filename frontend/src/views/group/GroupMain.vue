<template>
  <div class="group__main__wrapper">
    <div class="group__main__header">함께하는 소중한 시간</div>
    <!-- <transition-group name="group__list"> -->
    <div class="no__group__wrapper" v-if="noGroup">
      <div class="no__group__img">
        <img src="../../assets/image/unicorn3.png" alt="" />
        <p @click="moveToGroupCreate">모임을 만들어보세요!</p>
      </div>
    </div>
    <div class="group__main__list">
      <div
        class="group__main__card"
        :data-value="group.id"
        v-for="(group, index) in myGroups"
        :key="index"
      >
        <div class="group__main__card__container">
          <div
            class="group__main__member"
            v-for="(member, index) in group.abs_members"
            :key="index"
          >
            <div v-if="member.state">
              <div v-if="member.profile_img === ''">
                <img src="../../assets/image/profile_basic.png" alt="" />
              </div>
              <div v-else>
                <img :src="member.profile_img" alt="프로필 이미지" />
              </div>
            </div>
            <div v-else>+{{ member.length_num }}</div>
            <!-- <img src="@/assets/image/너구리.png" alt="" /> -->
          </div>
        </div>
        <h1>{{ group.name }}</h1>
        <p>{{ group.members.length }} people</p>
      </div>
    </div>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import init from "@/assets/js/group/GroupMain";
import { groupList } from "@/api/group";

export default {
  data() {
    return {
      myGroups: [],
      image: "",
      gourpListLoaded: false,
      noGroup: false,
    };
  },
  mounted() {
    init.init();
  },
  methods: {
    async loadGroup() {
      try {
        const { data } = await groupList();
        if (data.length == 0) {
          this.noGroup = true;
          return;
        }
        this.myGroups = data;
        this.gourpListLoaded = true;
        for (let item of this.myGroups) {
          item.members.map((ele) => (ele["state"] = true));
          if (item.members.length > 4) {
            item["abs_members"] = item.members.slice(0, 3);
            item["abs_members"].push({
              profile_img: "",
              length_num: item.members.length - 3,
              state: false,
            });
          } else {
            item["abs_members"] = item.members;
          }
        }
      } catch (error) {
        alert(error);
      }
    },
    moveToGroupCreate() {
      this.$router.push({ name: "CreateGroup" });
    },
  },
  created() {
    this.loadGroup();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/group/GroupMain";
</style>
