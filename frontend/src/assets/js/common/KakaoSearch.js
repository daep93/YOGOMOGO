const init = () => {
  const ps = new kakao.maps.services.Places();

  ps.keywordSearch('keyword', (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
        // data : 키워드 검색 결과
        // pagination : pagination.last(페이지 개수), pagination.gotoPage(i)(페이지 이동)
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        window.alert('검색 결과가 존재하지 않습니다.');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        window.alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
});
};

export default {
  init
};