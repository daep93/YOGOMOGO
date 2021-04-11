import router from '@/router/index';
const init = () => {
  const exitBtn = document.querySelector('.exit');

  function exit() {
    router.go(-1);
  }
  exitBtn.addEventListener('click', exit);

  // slider

  // const container = document.querySelector('.slider__container');
  // const slider = document.querySelector('.slider');
  // const box = document.querySelectorAll('.popup__store__info__img');
  // let width = box[0].offsetWidth + 10;
  // slider.style.minWidth = `${box.length * width}px`;
  // let start;
  // let change;
  // container.addEventListener('dragstart', e => {
  //   start = e.clientX;
  // });

  // container.addEventListener('dragover', e => {
  //   e.preventDefault();
  //   let touch = e.clientX;
  //   change = start - touch;
  // });

  // container.addEventListener('dragend', sliderShow);

  // container.addEventListener('touchstart', e => {
  //   start = e.touches[0].clientX;
  // });
  // container.addEventListener('touchmove', e => {
  //   e.preventDefault();
  //   let touch = e.touches[0];
  //   change = start - touch.clientX;
  // });
  // container.addEventListener('touchend', sliderShow);

  // function sliderShow() {
  //   if (change > 0) {
  //     container.scrollLeft += width;
  //   } else {
  //     container.scrollLeft -= width;
  //   }
  // }
};

export default {
  init,
};
