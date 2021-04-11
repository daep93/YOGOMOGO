<template>
  <section class="group--container">
    <header>My Groups</header>
    <article class="group--list">
      <div v-for="(group, index) in groups" :key="index" class="group--element" @click="moveToGroupPage(group.id)">
        <img :src="group.img" class="group--img" />
        <div class="group--name">
          {{ group.name }}
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { groupList } from '@/api/group';
export default {
  data() {
    return {
      groups: [],
      loaded: false,
    };
  },
  methods: {
    moveToGroupPage(id) {
      this.$router.push(`/group/page/${id}`);
    },
    async loadMyGroups() {
      try {
        const { data } = await groupList();
        this.groups = data;
        this.loaded = true;
      } catch (error) {
        alert(error);
      }
    },
  },
  created() {
    this.loadMyGroups();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/profile/ProfileGroupList';
</style>
