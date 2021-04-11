<template>
  <div class="review-edit-page">
    <loading-spinner v-if="!loaded"></loading-spinner>
    <div v-if="!this.$route.params.id">
      <div class="review-edit-page-main-title">
        <p>Create</p>
        <p>Review</p>
      </div>
      <div class="review-edit-page-main-title-explain">
        리뷰를 작성해볼까요?
      </div>
    </div>
    <div v-else>
      <div class="review-edit-page-main-title">
        <p>Update</p>
        <p>Review</p>
      </div>
      <div class="review-edit-page-main-title-explain">
        리뷰를 수정할 수 있어요!
      </div>
    </div>
    <!-- 별점 -->
    <!-- <star-rating></star-rating> -->
    <star-rating @addStarScore="addScore" :propsRatingData="score"></star-rating>
    <!-- 사진 입력 -->
    <label class="review-image-upload-button" for="file-input">이미지 업로드</label>
    <input
      type="file"
      id="file-input"
      name="upload[]"
      @change="previewImage"
      accept="image/*"
      style="display: none"
      multiple
    />
    <div class="review-image-upload">
      <div class="review-image-preview" v-for="(image, index) in preview_images" :key="index">
        <img class="review-image" :src="image" />
        <div @click="deleteImage(index)" class="delete-image">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>
    <!-- 한줄평 작성 -->
    <div class="review-edit-page-simple-evaluation">
      <p class="review-edit-page-subtitle">한줄평(15자 이내)</p>
      <input v-model="title" class="review-evaluation-input" maxlength="15" type="text" />
    </div>
    <!-- 글 작성 -->
    <div class="review-edit-page-contents">
      <p class="review-edit-page-subtitle">리뷰</p>
      <textarea v-model="contents" class="review-contents-input" name="" id="" cols="30" rows="5"></textarea>
    </div>
    <!-- 같이 먹은 그룹 입력 -->
    <div class="review-edit-page-group">
      <p class="review-edit-page-subtitle">그룹</p>
      <select v-model="group" class="review-group-select" id="groups" name="groups">
        <option v-for="(group_option, index) in group_options" :key="index" :value="group_option.id">
          {{ group_option.name }}
        </option>
      </select>
    </div>
    <!-- 테마 선택 -->
    <div class="review-edit-page-theme">
      <p class="review-edit-page-subtitle">테마</p>
      <select v-model="theme" class="review-theme-select" id="themes" name="themes">
        <option v-for="(theme_option, index) in theme_options" :key="index" :value="theme_option.text">
          {{ theme_option.text }}
        </option>
      </select>
    </div>
    <!-- 그룹 인원 입력 -->
    <div class="review-edit-page-headcount">
      <p class="review-edit-page-subtitle">인원수</p>
      <input
        v-model="headcount"
        class="review-headcount-input"
        type="number"
        onKeyup="this.value=this.value.replace(/[^0-9]/g,'');"
      />
    </div>
    <!-- kakao 검색 api 사용 -->

    <!-- {{ this.restaurant_info }} -->
    <search-restaurant
      v-if="loaded"
      @addRestaurantItem="addOneRestaurant"
      :propsRestaurant="restaurant_info"
    ></search-restaurant>
    <!-- 태그 입력 -->
    <p class="review-edit-page-subtitle">태그</p>
    <div class="review-edit-page-tags">
      <input v-model="tagItem" @keypress.enter="createTag" class="review-tag-input" type="text" />
      <button @click="createTag" class="create-tag-button">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <ul class="row">
      <li class="review-tag" v-for="(tag, index) in tags" :key="index">
        <div>
          {{ tag }}
          <span @click="removeTag(tag, index)">X</span>
        </div>
      </li>
    </ul>
    <!-- 버튼 -->
    <div v-if="this.$route.params.id">
      <button class="review-delete-submit" @click="deleteReview">Delete</button>
      <button class="review-update-submit" @click="updateReview">Update</button>
    </div>
    <button v-else class="review-create-submit" @click="createReview">
      Create
    </button>
  </div>
</template>

<script>
import StarRating from '@/components/review/StarRating';
import SearchRestaurant from '@/components/review/SearchRestaurant';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { reviewDetail, reviewCreate, reviewUpdate, reviewDelete } from '@/api/review';
import { groupList } from '@/api/group';
import { uploadImg } from '@/api/image';

export default {
  components: {
    StarRating,
    SearchRestaurant,
    LoadingSpinner,
  },
  data() {
    return {
      // placeItem: '',
      check: false,
      loaded: false,
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
      file: '',
      files: [],
      images: [],
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
      this.score = star_rating;
    },
    async previewImage(event) {
      const input = event.target;
      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
          this.preview_images.push(this.imageData);
        };
        reader.readAsDataURL(file);
        this.files.push(file);
      }
    },
    deleteImage(index) {
      this.files.splice(index, 1);
      this.preview_images.splice(index, 1);
      this.images.splice(index, 1);
      this.imageData = '';
      // if (this.files[0] === undefined) {
      //   this.files.splice(index, 2);
      //   this.preview_images.splice(index, 2);
      // }
    },
    checkValidation() {
      if (this.score === '') {
        alert('평점을 입력해주세요!');
        return false;
      }
      if (this.title === '') {
        alert('한줄평을 입력해주세요!');
        return false;
      }
      if (this.contents === '') {
        alert('리뷰를 입력해주세요!');
        return false;
      }
      if (this.group === '') {
        alert('그룹을 선택해주세요!');
        return false;
      }
      if (this.theme === '') {
        alert('테마을 선택해주세요!');
        return false;
      }
      if (this.headcount === '') {
        alert('인원수를 입력해주세요!');
        return false;
      }
      if (this.restaurant_id === '') {
        alert('음식점을 입력해주세요!');
        return false;
      }
      if (this.files.length === 0) {
        alert('사진을 입력해주세요!');
        return false;
      }
      if (this.tags.length === 0) {
        alert('태그를 입력해주세요!');
        return false;
      }
      return true;
    },
    // 리뷰 생성하기
    async createReview() {
      if (!this.checkValidation()) return;
      try {
        for (const file of this.files) {
          if (typeof file !== 'object') continue;
          const frm = new FormData();
          frm.append('image', file);
          const { data } = await uploadImg(frm);
          this.images.push(data.image);
        }

        const { data } = await reviewCreate({
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
          files: this.files,
          tags: this.tags,
        });
        alert('리뷰가 생성되었습니다😉');
        // 이동시킬 페이지 적어주기(리뷰 피드 게시판)
        this.$router.push({ name: 'GroupPopUP', params: { from: 'feed', id: data.id } });
      } catch (error) {
        alert(error);
      }
    },
    // 리뷰 수정하기
    async updateReview() {
      if (!this.checkValidation()) return;
      const review_id = this.$route.params.id;
      try {
        for (const file of this.files) {
          if (typeof file !== 'object') continue;
          const frm = new FormData();
          frm.append('image', file);
          const { data } = await uploadImg(frm);
          this.images.push(data.image);
        }
        const { data } = await reviewUpdate(review_id, {
          // 넘길 데이터 적어주기
          score: this.score,
          title: this.title,
          contents: this.contents,
          group: this.group,
          theme: this.theme,
          headcount: this.headcount,
          restaurant_id: this.restaurant_id,
          restaurant_info: this.restaurant_info['id'],
          images: this.images,
          files: this.files,
          tags: this.tags,
        });
        alert('리뷰가 수정되었습니다😉');
        this.$router.push({ name: 'GroupPopUP', params: { from: 'feed', id: data.id } });
      } catch (error) {
        alert(error);
      }
    },
    // 리뷰 삭제하기
    async deleteReview() {
      try {
        const review_id = this.$route.params.id;
        await reviewDelete(review_id);
        alert('리뷰 삭제가 완료되었습니다!');
        // 이전 페이지로 이동
        this.$router.push({ name: 'Feed' });
      } catch (error) {
        alert(error);
      }
    },
    checkForm() {
      if (
        this.score &&
        this.title &&
        this.contents &&
        this.group &&
        this.theme &&
        this.headcount &&
        this.restaurant_info &&
        this.images.length > 0 &&
        this.tags
      ) {
        this.check = true;
      }
    },
  },
  async created() {
    // 사용자의 그룹 목록을 가져오기
    try {
      const { data } = await groupList();
      this.group_options = data;
      this.loaded = true;
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
        // this.preview_images = data.preview_images;
        this.files = [...data.image];
        this.preview_images = [...data.image];
        this.images = data.image;
        this.tags = data.tags;
        this.loaded = true;
        console.log(this.preview_images)
      } catch (error) {
        alert(error);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/ReviewEditPage.scss';
</style>
