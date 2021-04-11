<template class="feed-create-all">
  <div style="padding:20px 20px">
    <div @click="closeCreatePage" class="feed-create-page-close">X</div>
    <div class="feed-create-main-title">
      Create Review
    </div>
    <!-- 별점 -->
    <star-rating @addStarScore="addScore" :propsRatingData="score"></star-rating>
    <!-- 사진 입력 -->
    <!-- <review-image></review-image> -->
    <div class="feed-image-upload-total">
      <input type="file" name="upload[]" @change="previewImage" accept="image/*" />
      <div class="feed-image-preview" v-if="preview_images.length > 0">
        <div class="feed-preview-total" v-for="(image, index) in preview_images" :key="index">
          <img class="feed-preview" :src="image" />
        </div>
      </div>
    </div>
    <!-- 사진 여러개 -->
    <!-- <input type="file" id="image" accept="image/*" 
      @change="setThumbnail(event);" multiple/> 
    <div id="image_container"></div> -->

    <!-- 한줄평 작성 -->
    <div class="feed-title-create-total">
      <p class="feed-create-subtitle">한줄평(15자 이내)</p>
      <input v-model="title" class="feed-title-create" maxlength="15" type="text" />
      <!-- <p v-if="title.length > 15">15자 이내로 입력해주세요</p> -->
    </div>
    <!-- 글 작성 -->
    <div class="feed-contents-create-total">
      <p class="feed-create-subtitle">리뷰</p>
      <textarea v-model="contents" class="feed-contents-create" name="" id="" cols="30" rows="5"></textarea>
    </div>
    <!-- 테마 선택 -->
    <div class="feed-theme-create-total">
      <p class="feed-create-subtitle">테마</p>
      <select v-model="theme" class="feed-theme-create" id="themes" name="themes">
        <option v-for="(theme_option, index) in theme_options" :key="index" :value="theme_option.text">
          {{ theme_option.text }}
        </option>
      </select>
    </div>
    <!-- 같이 먹은 그룹 입력 -->
    <div class="feed-groups-create-total">
      <p class="feed-create-subtitle">그룹</p>
      <select v-model="group" class="feed-groups-create" id="groups" name="groups">
        <option v-for="(group_option, index) in group_options" :key="index" :value="group_option.id">
          {{ group_option.name }}
        </option>
      </select>
    </div>
    <!-- 그룹 인원 입력 -->
    <div class="feed-headcount-create-total">
      <p class="feed-create-subtitle">인원수</p>
      <input
        v-model="headcount"
        class="feed-headcount-create"
        type="number"
        onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
      />
    </div>
    <!-- kakao 검색 api 사용 -->
    <search-restaurant @addRestaurantItem="addOneRestaurant" :propsRestaurant="restaurant_info"></search-restaurant>
    <!-- 식당 정보 입력-->
    <!-- <div class="feed-restaurant-name-create-total">
      <p class="feed-create-subtitle">Restaurant name</p>
      <input v-model="restaurant_name" class="feed-restaurant-name-create" type="text">
    </div> -->
    <!-- 식당 주소 입력 -->
    <!-- <div class="feed-restaurant-address-create-total">
      <p class="feed-create-subtitle">Restaurant address</p>
      <input v-model="restaurant_address" class="feed-restaurant-address-create" type="text">
    </div> -->
    <!-- 태그 입력 -->
    <div class="feed-tags-create-total">
      <p class="feed-create-subtitle">태그</p>
      <input v-model="tagItem" @keypress.enter="createTag" class="feed-tags-create" type="text" />
    </div>
    <ul class="row">
      <li class="feed-created-tag" v-for="(tag, index) in tags" :key="index">
        <div>
          {{ tag }}
          <span @click="removeTag(tag, index)">X</span>
        </div>
      </li>
    </ul>
    <!-- 버튼 -->
    <div v-if="this.$route.params.id !== undefined">
      <button class="feed-delete-submit" @click="deleteReview">Delete</button>
      <button class="feed-update-submit" @click="updateReview">Update</button>
    </div>
    <button v-else class="feed-create-submit" @click="createReview">Create</button>
  </div>
</template>

<script>
import StarRating from '@/components/review/StarRating';
import SearchRestaurant from '@/components/review/SearchRestaurant';
import '@/assets/styles/feedCreate.css';
import { reviewDetail, reviewCreate, reviewUpdate, reviewDelete } from '@/api/review';
import { groupList } from '@/api/group';
import { uploadImg } from '@/api/image';

export default {
  components: {
    StarRating,
    SearchRestaurant,
  },
  data() {
    return {
      score: '',
      title: '',
      contents: '',
      group: '',
      group_options: [],
      theme: '',
      theme_options: [
        { text: '가족', value: 0 },
        { text: '친구', value: 1 },
        { text: '연인', value: 2 },
        { text: '회식', value: 3 },
      ],
      headcount: '',
      restaurant_id: '',
      restaurant_info: '',
      images: [],
      files: [],
      image: '',
      preview_images: [],
      tags: [],
      tagItem: '',
      imageData: '',
    };
  },
  methods: {
    closeCreatePage() {
      this.$router.push({ path: '/feed' });
    },
    createTag() {
      if (this.tagItem !== '') {
        this.tags.push(this.tagItem);
      }
      this.tagItem = '';
    },
    removeTag(tag, index) {
      this.tags.splice(index, 1);
    },
    addOneRestaurant(restaurant_info) {
      this.restaurant_info = restaurant_info['id'];
      this.restaurant_id = restaurant_info['id'];
    },
    addScore(star_rating) {
      this.score = star_rating + 1;
    },
    previewImage(event) {
      const input = event.target;
      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
          // this.preview_images(this.imageData);
          this.preview_images = [this.imageData];
        };
        reader.readAsDataURL(file);
        // this.files.push(file);
        this.files = file;
      }
    },

    // 리뷰 생성하기
    async createReview() {

        try {
          if (this.files.length > 0) {
            // for (const file of this.files) {
            //   const frm = new FormData();
            //   frm.append('image', file);
            //   const { data } = await saveImage(frm);
            //   this.images.push(data.image);
            // }
            const frm = new FormData();
            frm.append('image', this.files[0]);
            const { data } = await uploadImg(frm);
            this.images = data.image;
          }
          await reviewCreate({
            // 넘길 데이터 적어주기
            score: this.score,
            title: this.title,
            contents: this.contents,
            group: this.group,
            theme: this.theme,
            headcount: this.headcount,
            restaurant_id: this.restaurant_id,
            restaurant_info: this.restaurant_info,
            images: this.images[1],
            tags: this.tags,
          });
          // 이동시킬 페이지 적어주기(리뷰 피드 게시판)
          this.$router.push({ path: '/feed' });
        } catch (error) {
          alert(error);
        }
      }
    },
    // 리뷰 수정하기
    async updateReview() {
      const review_id = this.$route.params.id;
      try {
        // TODO : 이미지 서버에 저장하기
        await reviewUpdate(review_id, {
          // 넘길 데이터 적어주기
          score: this.score,
          title: this.title,
          contents: this.contents,
          group: this.group,
          theme: this.theme,
          headcount: this.headcount,
          restaurant_id: this.restaurant_id,
          restaurant_info: this.restaurant_info,
          images: this.images,
          tags: this.tags,
        });
        // 이동시킬 페이지 적어주기(리뷰 피드 게시판)
        this.$router.push({ path: '/feed' });
      } catch (error) {
        alert(error);
      }
    },
    // 리뷰 삭제하기
    async deleteReview() {
      try {
        const review_id = this.$route.parmas.id;
        await reviewDelete(review_id);
        // 이동시킬 페이지 적어주기(리뷰 피드 게시판)
        this.$router.push({ path: '/feed' });
      } catch (error) {
        alert(error);
      }
    },
  },
  async created() {
    // 사용자의 그룹 목록을 가져오기
    try {
      const { data } = await groupList();
      this.group_options = data;
    } catch (error) {
      alert(error);
    }

    // 리뷰 수정하기 (데이터 받아오기)
    const review_id = this.$route.params.id;
    if (review_id) {
      try {
        const { data } = await reviewDetail(review_id);
        // 가져올 데이터 목록
        this.score = data.score;
        this.title = data.title;
        this.contents = data.contents;
        this.group = data.group;
        this.theme = data.theme;
        this.headcount = data.headcount;
        this.restaurant_id = data.restaurant_id;
        this.restaurant_info = data.restaurant_info;
        this.images = data.images;
        this.tags = data.tags;
      } catch (error) {
        alert(error);
      }
    }
  },
};
</script>

<style scoped>
.feed-groups-create {
  width: 100px;
}
</style>
