<template>
  <animated-number :value="value" :formatValue="formatToPrice" :duration="duration" class="food-mate-value" />
</template>

<script>
import AnimatedNumber from 'animated-number-vue';

export default {
  components: {
    AnimatedNumber,
  },
  data() {
    return {
      value: 97,
      duration: 1000,
    };
  },
  methods: {
    formatToPrice(value) {
      return `${value.toFixed(0)}%`;
    },
  },
};
</script>

<style scoped></style>
