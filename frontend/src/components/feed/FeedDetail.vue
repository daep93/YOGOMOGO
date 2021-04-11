<template>
<div>
  <div class="total-hot-feed-detail" v-for="index in 6" :key="index">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' rel='stylesheet' type='text/css'>
      <div class="container">
        <div class="background"></div>
        <h3> 대전 빵 투어 </h3>
        <div class="whole-feed-score-box">
          <p class="whole-feed-score-text">😋 4.8</p>
        </div>
        <div class="overlay">
          <p class="overlay-font">🚩 대전 유성구 덕명동</p>
          <p class="overlay-main">너무 맛있어서 또 가고 싶은 곳!</p>
          <p class="overlay-main">빵을 좋아하시는 분들께 추천합니다!</p>
          <p class="overlay-main">친구들이랑 같이 가면 좋은 곳!</p>
        </div>
      </div>
  </div>
</div>
</template>
<script>
import '@/assets/styles/FeedDetail.css';
export default {

}
</script>

<style>

</style>