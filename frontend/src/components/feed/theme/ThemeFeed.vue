<template>
  <div class="container">
    <section class="search--bar">
      <input type="text" v-model="search" placeholder="검색" @keydown.enter="setTag" />
      <div @click="setTag">
        <i class="far fa-compass"></i>
      </div>
    </section>
    <section class="feed--container">
      <!-- 카드가 들어오는 곳 -->
      <article v-for="(info, index) in fetchedData" :key="index" class="post--container">
        <div class="review--thumbnail">
          <!-- 사진이 들어오는 곳 -->
          <img
            @click="moveToPage(info.id)"
            :src="info.image[0] ? info.image[0] : 'https://source.unsplash.com/cdRUE5bHCGc/1600x900'"
          />
          <div class="top--nav">
            <div class="score">😋 {{ info.score }}</div>
            <div class="bookmark" @click="toggleBookMark(index)">
              <i class="fas fa-bookmark" v-if="info.bookmarked"></i>
              <i class="far fa-bookmark" v-else></i>
            </div>
          </div>
        </div>
        <div>
          <!-- 리뷰의 정보가 오는 곳 -->
          <div class="store--info--head">
            <div class="headcounter">{{ info.headcount }}인</div>
            <div class="title">{{ info.title }}</div>
          </div>
          <div class="store--info--foot">
            {{ info.restaurant_info.store_name }} /📍{{ surpressedLoc(info.restaurant_info.address) }}
          </div>
        </div>
      </article>
      <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="loaded"></infinite-loading>
      <article v-if="errorFlag" class="error--msg">
        {{ errorMsg }}
      </article>
    </section>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { getThemeFeed, toggleReviewBookmark } from '@/api/review';
export default {
  components: {
    InfiniteLoading,
  },
  props: {
    theme: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      fetchedData: [],
      search: '',
      tag: '',
      limit: 3,
      page: 1,
      loaded: true,
      errorMsg: '해당 지역에서 리뷰가 없습니다',
      errorFlag: false,
    };
  },
  methods: {
    async toggleBookMark(index) {
      try {
        await toggleReviewBookmark(this.fetchedData[index].id);
        this.fetchedData[index].bookmarked = !this.fetchedData[index].bookmarked;
      } catch (error) {
        alert(error);
      }
    },
    moveToPage(pathId) {
      this.$router.push({ name: 'GroupPopUP', params: { from: 'feed', id: pathId } });
    },
    resetSetting() {
      this.page = 1;
      this.tag = this.search;
      this.fetchedData = [];
      this.errorMsg = '해당 지역에서 리뷰가 없습니다';
      this.errorFlag = false;
    },
    async setTag() {
      this.resetSetting();
      await this.loadReviews();
      this.loaded = true;
      if (this.fetchedData.length == 0) {
        this.errorMsg = `'${this.search}'에 대한 검색결과가 없습니다`;
      }
    },
    surpressedLoc(loc) {
      const locArr = loc.split(' ');
      return locArr[1] + ' ' + locArr[2];
    },
    async infiniteHandler($state) {
      try {
        await this.loadReviews();
        $state.loaded();
      } catch (error) {
        $state.complete();
      }
    },
    async loadReviews() {
      try {
        const { data } = await getThemeFeed({
          params: {
            theme: this.theme,
            page: this.page,
            limit: this.limit,
            address: this.$store.state.location,
            tag: this.tag,
          },
        });
        this.fetchedData = [...this.fetchedData, ...data.results];
        if (this.fetchedData.length == 0) {
          this.errorFlag = true;
        }
        if (!data.next) this.loaded = false;
        else this.page++;
        return data;
      } catch (error) {
        if (error.response.status == 404) this.loaded = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/feed/ThemeFeed';
</style>
