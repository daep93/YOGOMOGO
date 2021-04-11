import router from '@/router/index';

const init = () => {
  const groupPost = document.querySelector('.group__post__wrapper');

  function groupHandler(e) {
    if (e.target.classList.contains('post__box')) {
      const id = e.target.dataset.value;
      const name = e.target.dataset.name;
      router.push({ name: 'GroupPopUP', params: { id: id, from: name } });
    }
  }
  groupPost.addEventListener('click', groupHandler);
};

export default { init };
