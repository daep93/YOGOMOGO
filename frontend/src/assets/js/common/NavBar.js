const init = () => {
  let currentPosition;
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav__wrapper');
    let x = window.scrollY;
    if (x - currentPosition > 0) {
      nav.style.opacity = '0';
    } else {
      nav.style.opacity = '1';
    }
    currentPosition = x;
  });
};

export default { init };
