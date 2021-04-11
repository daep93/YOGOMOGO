import router from '@/router/index';

const init = () => {
  const group = document.querySelector('.group__main__list');
  function groupHandler(e) {
    if (e.target.classList.contains('group__main__card')) {
      const id = e.target.dataset.value;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      router.push(`/group/page/${id}`);
    }
  }
  group.addEventListener('click', groupHandler);
};

export default { init };
