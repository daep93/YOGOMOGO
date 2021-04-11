export const init = () => {
  const grayBackground = document.querySelector('.gray__background');
  const randomContainer = document.querySelector('.random__container');
  const modalExit = document.querySelector('.modal__exit');
  const modalCard = document.querySelector('.modal__card');
  let targetEle;
  function exitHandler() {
    modalCard.classList.remove('showModal');
    targetEle.remove('flip__card');
    grayBackground.classList.remove('selected');
  }

  modalExit.addEventListener('click', exitHandler);
  function randomHandler(e) {
    if (e.target.classList.contains('random__cell')) {
      targetEle = e.target.classList;
      e.target.classList.add('flip__card');
      modalCard.classList.add('showModal');
      grayBackground.classList.add('selected');
      //  상세 페이지로 넘겨주기

      // 만약에 값이 없으면 꽝!
    }
  }
  randomContainer.addEventListener('click', randomHandler);
};
