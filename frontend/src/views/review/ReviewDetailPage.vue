<template>
  <div>
    {{ score }} | {{ title }} | {{ contents }} | {{ tags }} | {{ theme }}
    <br />
    {{ restaurant_info }}
    <br />
    {{ images }}
  </div>
</template>

<script>
import { reviewDetail } from '@/api/review';
export default {
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
      preview_images: [],
      tags: [],
      tagItem: '',
      imageData: '',
    };
  },
  async created() {
    // 데이터 받아오기)
    const review_id = this.$route.params.id;
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
  },
};
</script>

<style></style>
