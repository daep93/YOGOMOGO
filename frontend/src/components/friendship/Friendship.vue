<template>
  <div>
    <friend-request></friend-request>
    <friend-accept></friend-accept>
  </div>
</template>

<script>
import FriendAccept from '@/components/friendship/FriendAccept';
import FriendRequest from '@/components/friendship/FriendRequest';
export default {
  components: {
    FriendAccept,
    FriendRequest,
  },
};
</script>

<style scoped></style>
