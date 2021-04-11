import router from '@/router/index';

export const init = () => {
  const exitBtn = document.querySelector('.recommend__all__exit');
  function backHandler(e) {
    router.go(-1);
  }

  const recommendWrapper = document.querySelector('.recommend__all__grid__container');
  if (recommendWrapper) {
    recommendWrapper.addEventListener('click', recommendDetailHandler);
  }
  function recommendDetailHandler(e) {
    if (e.target.classList.contains('recommend__box')) {
      const id = e.target.dataset.value;
      router.push({ name: 'GroupPopUP', params: { id: id, from: 'recommend' } });
    }
  }
  exitBtn.addEventListener('click', backHandler);
};

export const choice = () => {
  const recommendAllChoice = document.querySelector('.recommend__all__grid__container__choice');
  const randomChoiceBtn = document.querySelector('.random__choice__btn');
  let arr = [];
  let images = [];
  let names = [];
  function choiceHandler(e) {
    if (e.target.classList.contains('choice__box')) {
      const id = e.target.dataset.id;
      const name = e.target.dataset.value;
      const image = e.target.dataset.img;
      e.target.classList.toggle('choiced');
      if (!arr.includes(id)) {
        arr.push(id);
        images.push(image);
        names.push(name);
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === id) {
            arr.splice(i, 1);
            images.splice(i, 1);
            names.splice(i, 1);
            i--;
          }
        }
      }
    }
  }

  function createBoardHandler(e) {
    router.push({ name: 'RandomBoardPage', params: { randomArr: arr, randomImg: images, randomName: names } });
  }
  recommendAllChoice.addEventListener('click', choiceHandler);
  randomChoiceBtn.addEventListener('click', createBoardHandler);
};
