<template>
  <section>
    <header class="group--page--header">
      <div>{{ headerMsg[0] }}</div>
      <div>{{ headerMsg[1] }}</div>
      <div>함께 식사할 그룹을 만들어볼까요?</div>
    </header>
    <article>
      <div class="group--image">
        <img :src="img ? img : require('@/assets/image/profile_basic.png')" />
        <div>
          <label for="group--file">
            <i class="fas fa-pen"></i>
          </label>
          <input ref="imageInput" id="group--file" type="file" @change="onChangeImages" />
        </div>
      </div>
      <div class="group--name">
        <!-- <i class="fas fa-pen"></i> -->
        <input type="text" v-model="name" placeholder="Group Name" />
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    exName: {
      type: String,
      require: true,
    },
    exImg: {
      type: String,
      require: true,
    },
    option: {
      type: String,
      require: true,
    },
  },
  methods: {
    onChangeImages(e) {
      const file = e.target.files[0];
      this.img = URL.createObjectURL(file);
      this.imgFile = file;
      this.$emit('updateImg', file);
    },
  },
  data() {
    const headerMsg = [];
    if (this.option == 'create') {
      headerMsg.push('Create');
      headerMsg.push('New Group');
    } else {
      headerMsg.push('Update');
      headerMsg.push('My Group');
    }
    return {
      name: this.exName,
      img: this.exImg,
      imgFile: '',
      headerMsg,
    };
  },
  watch: {
    name(newValue) {
      this.$emit('updateName', newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/group/GroupResource';
</style>
