const testCase = [
  {
    id: 10, // 리뷰 글 번호
    image: 'https://i.pinimg.com/originals/cb/dd/41/cbdd411ad14b38130bdf3158d8661383.png', // 리뷰 이미지
    theme: '가족', // 리뷰 테마 (가족, 연인, 친구, 회식)
    title: '대전의 디저트 맛집', // 리뷰 제목
    score: 4.7, // 리뷰에 매긴 평점
    headcount: 4, // 인원수
    restaurant: { // 식당 정보 
      id: 12, // 식당 id
      restaurant_name: 'Cakehouse', // 식당 이름
      location: '대전 유성구 덕명동', // 식당 위치
    },
    writer: { // 리뷰 작성자 정보
      id: 11, // 리뷰 작성자 id
      username: 'emma', // 리뷰 작성자 유저이름
      profile_img: 'https://data.whicdn.com/images/344584568/original.jpg', // 리뷰 작성자 프로필 이미지
    },
    bookmarked: false, // 북마크 여부
    viewed_num: 100, // 조회수
  },
  {
    id: 1, 
    image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2018/05/paneer-pizza-recipe-1-500x500.jpg', 
    theme: '친구', 
    title: '화덕 피자 맛집', 
    score: 4.6, 
    headcount: 6, 
    restaurant: { 
      id: 11, 
      restaurant_name: 'Pizzaria', 
      location: '대전 유성구 봉명동',
    },
    writer: { 
      id: 2, 
      username: 'Tom', 
      profile_img: 'https://i.pinimg.com/736x/04/82/ee/0482ee5237f15a3b0c18aed0ea27dbb8.jpg', 
    },
    bookmarked: false, 
    viewed_num: 111, 
  },
  {
    id: 2, 
    image: 'https://i.redd.it/ixjmkjxzq6h01.jpg', 
    theme: '연인', 
    title: '와플이 먹고 싶다면', 
    score: 4.8, 
    headcount: 2, 
    restaurant: { 
      id: 11, 
      restaurant_name: '와플와플', 
      location: '대전 유성구 덕명동',
    },
    writer: { 
      id: 3, 
      username: 'emy', 
      profile_img: 'https://static.wikia.nocookie.net/harrypotter/images/0/08/Emma_Watson.jpg/revision/latest/top-crop/width/360/height/450?cb=20120927223300', 
    },
    bookmarked: false, 
    viewed_num: 11, 
  },
  {
    id: 3, 
    image: 'https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/pre_20190717094556_photo1_419f2ef753a7.jpg', 
    theme: '가족', 
    title: '전통 찻집 추천', 
    score: 4.7, 
    headcount: 4, 
    restaurant: { 
      id: 14, 
      restaurant_name: '세실', 
      location: '대전 유성구 덕명동',
    },
    writer: { 
      id: 5, 
      username: 'toby', 
      profile_img: 'https://lastwordonsports.com/football/wp-content/uploads/sites/4/2021/01/gettyimages-1296203931-594x594-1.jpg', 
    },
    bookmarked: false, 
    viewed_num: 24, 
  }
];
export { testCase };
