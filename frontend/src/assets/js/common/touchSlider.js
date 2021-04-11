const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const box = document.querySelectorAll('.box');
let width = box[0].offsetWidth + 30;
slider.style.minWidth = `${box.length * width}px`;
let start;
let change;
container.addEventListener('dragstart', e => {
  start = e.clientX;
});

container.addEventListener('dragover', e => {
  e.preventDefault();
  let touch = e.clientX;
  change = start - touch;
});

container.addEventListener('dragend', sliderShow);

container.addEventListener('touchstart', e => {
  start = e.touches[0].clientX;
});
container.addEventListener('touchmove', e => {
  e.preventDefault();
  let touch = e.touches[0];
  change = start - touch.clientX;
});
container.addEventListener('touchend', sliderShow);

function sliderShow() {
  if (change > 0) {
    container.scrollLeft += width;
  } else {
    container.scrollLeft -= width;
  }
}
