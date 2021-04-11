import route from '@/router/index';
export const init = () => {
  window.addEventListener('scroll', function() {
    if (route.history.current.name === 'GroupPopUP') {
      const feedHeader = document.querySelector('.group__recommend__detail__header');
      const menuList = document.querySelector('.menus__list');
      const mainMenus = document.querySelector('.main__menus');
      const feedSection = document.querySelector('.group__recommend__detail__section__wrapper');
      const speed = 0.5;
      if (menuList && feedHeader && mainMenus) {
        let bodyHeight = document.body.clientHeight ? document.body.clientHeight : 0;
        let mainMenusHeight = mainMenus ? mainMenus.clientHeight : 0;
        let feedSectionHeight = feedSection ? feedSection.clientHeight : 0;
        const StdHeight = bodyHeight - mainMenusHeight - feedSectionHeight;
        let scrollY = window.scrollY;
        let scaleValue = 1 - scrollY / StdHeight;
        if (scaleValue >= 0) {
          menuList.style.transform = `scale(${scaleValue})`;
        } else {
          menuList.style.transform = `scale(0)`;
        }
        menuList.style.opacity = `${StdHeight - scrollY * 1.2}`;
        feedHeader.style.transform = `translateY(${scrollY * speed}px)`;
        mainMenus.style.transform = `translate(-${scrollY * 0.26}px,${scrollY * 0.99}px)`;
      }
    }
  });
};
