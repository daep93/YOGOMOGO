<template>
  <section>
    <article class="modal--overlay"></article>
    <article class="modal--container" v-show="!confirmed">
      <div>{{ msg1 }}</div>
      <div><img src="@/assets/image/notwant.png" alt="" /></div>
      <div class="button--container">
        <div
          @click="
            confirmed = true;
            $emit('ok');
          "
        >
          Yes
        </div>
        <div @click="$emit('close')">Back</div>
      </div>
    </article>
    <article class="modal--container" v-show="confirmed">
      <div>{{ msg2 }}</div>
      <div><img src="@/assets/image/complete.png" alt="" /></div>
      <div class="button--container">
        <div @click="$emit('close')">확인</div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    msg1: {
      type: String,
      require: true,
    },
    msg2: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      confirmed: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common/YesOrNoModal';
</style>
