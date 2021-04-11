<template>
  <div>
    <div id="file-upload">
      <div class="upload">
        <a>
          <span class="image-upload-btn">이미지 업로드</span>
          <div class="files"><input type="file" id="files" name="files[]" multiple="" /></div>
        </a>
      </div>
      <div class="box">
        <div class="info-box">이미지가 없습니다.</div>
        <div id="container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/reviewImage.css';
import init from '@/assets/js/review/reviewImage.js';
export default {
  // components: {
  //   init
  // },
  data() {
    return {
      // images: ['hello'],
      photo: [],
    };
  },
  mounted() {
    init.init();
  },
};
</script>

<style></style>
