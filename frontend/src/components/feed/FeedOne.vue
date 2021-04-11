<template>
  <div>
    <div>
      <p class="small-title">Feed component 1 💕</p>
    </div>
    <!-- 1번 -->
    <section class="wrapper">
      <!-- BEGIN: card -->
      <div class="card" data-effect="zoom">
        <button class="card__save  js-save" type="button">
          <i class="fa  fa-bookmark"></i>
        </button>
        <figure  class="card__image">
          <img src="https://image-cdn.hypb.st/https%3A%2F%2Fbae.hypebeast.com%2Ffiles%2F2020%2F09%2Fhong-kong-miss-lee-vegetarian-chinese-food-hypebae-brunch-review-5.jpg?w=1600&cbr=1&q=90&fit=max" alt="Short description">
        </figure>
        <div class="card__header">
          <figure class="card__profile">
            <img src="https://data.whicdn.com/images/344584568/original.jpg" alt="Short description">
          </figure>
        </div>
        <div class="card__body">
          <h3 class="card__name">화덕 피자 맛집👍</h3>
          <p class="card__job">대전시 유성구 덕명동</p>
          <p class="card__bio">정말 맛있어요!! 또 먹으러 가려구요!</p>
          <!-- <p class="score-text">😋 4.8</p> -->
        </div>
        <div class="card__footer">
          <p class="card__date">Pizzaria</p>
          <p class=""></p>
        </div>
      </div>
      <!-- END: card -->
    </section>
  </div>
</template>

<script>
import '@/assets/styles/feedOne.css';
export default {

}
</script>

<style scoped>

</style>