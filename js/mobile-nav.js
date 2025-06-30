// js/mobile-nav.js

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const sideMenu  = document.querySelector('.side-menu');
  const closeBtn  = document.querySelector('.side-menu__close');
  const links     = document.querySelectorAll('.side-menu__list a');

  const toggleMenu = () => {
    const isOpen = sideMenu.classList.toggle('open');
    hamburger.classList.toggle('is-active', isOpen);
    sideMenu.setAttribute('aria-hidden', !isOpen);

    // Forzamos que el botón siga mostrándose
    hamburger.style.display = 'flex';
  };

  hamburger.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);
  links.forEach(link => link.addEventListener('click', toggleMenu));
});
