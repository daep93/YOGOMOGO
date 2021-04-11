import route from '@/router/index';

export const init = () => {
  window.addEventListener('scroll', function() {
    if (route.history.current.name === 'GroupPage') {
      const speed = 0.3;
      let scrollY = window.scrollY;
      const pageSection = document.querySelector('.group__page__section');
      const bgImg = document.querySelector('.background__img');
      if (window.innerHeight - scrollY >= '712') {
        pageSection.style.transform = `translate(0,-${scrollY * speed}px)`;
        bgImg.style.transform = `translate(0,${scrollY * (speed + 0.3)}px)`;
      }
    }
  });
};
