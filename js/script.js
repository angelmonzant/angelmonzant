// js/script.js

document.addEventListener('DOMContentLoaded', () => {
  // ——————————————————————
  // Animación de entrada del hero
  // ——————————————————————
  const video = document.querySelector('.hero__video');
  const playAnim = () => video.classList.add('is-loaded');

  video.addEventListener('loadeddata', playAnim);
  video.addEventListener('canplaythrough', playAnim);
  if (video.readyState >= 3) playAnim();
  video.addEventListener('error', e => console.error('Error cargando video:', e));

  // ——————————————————————
  // Scroll reveal bidireccional
  // ——————————————————————
  const sections = document.querySelectorAll('.section');
  let prevScrollY = window.pageYOffset;

  const handleScroll = () => {
    const currScrollY = window.pageYOffset;
    const scrollingDown = currScrollY > prevScrollY;

    sections.forEach(sec => {
      // Punto de disparo: 25% antes de que la sección alcance la parte superior
      const triggerPoint = sec.offsetTop - window.innerHeight * 0.25;

      if (scrollingDown) {
        // Al bajar: si pasamos el trigger, muestro
        if (currScrollY > triggerPoint) {
          sec.classList.add('visible');
        }
      } else {
        // Al subir: si volvemos por encima del trigger, oculto
        if (currScrollY < triggerPoint) {
          sec.classList.remove('visible');
        }
      }
    });

    prevScrollY = currScrollY;
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // dispararlo al cargar en caso de recarga a mitad de página
});



document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('services-pinned');
  const blocks  = Array.from(section.querySelectorAll('.service-block'));
  let lastY = window.pageYOffset;

  const onScroll = () => {
    const scrollY      = window.pageYOffset;
    const sectionTop   = section.offsetTop;
    const relScroll    = scrollY - sectionTop;
    const vh           = window.innerHeight;
    const maxIndex     = blocks.length - 1;
    const rawIndex     = relScroll / vh;
    const index        = Math.min(maxIndex, Math.max(0, Math.floor(rawIndex + 0.5))); 

    // Determina si bajamos o subimos
    const scrollingDown = scrollY > lastY;

    blocks.forEach((block, i) => {
      block.classList.remove('past','active','upcoming');
      if (i < index)       block.classList.add('past');
      else if (i > index)  block.classList.add('upcoming');
      else                 block.classList.add('active');
    });

    lastY = scrollY;
  };

  window.addEventListener('scroll', onScroll);
  onScroll(); // para estado inicial
});



// — Scroll “split” para todas las about-pinned —
document.querySelectorAll('.about-pinned').forEach(section => {
  const leftImg   = section.querySelector('.about-img--left');
  const rightImg  = section.querySelector('.about-img--right');
  const aboutText = section.querySelector('.about-content');

  window.addEventListener('scroll', () => {
    const scrollY   = window.pageYOffset;
    const secTop    = section.offsetTop;
    const relScroll = scrollY - secTop;
    const vh        = window.innerHeight;
    let progress    = Math.min(Math.max(relScroll / vh, 0), 1);

    leftImg.style.transform  = `translateX(${ -progress * 50 }%)`;
    rightImg.style.transform = `translateX(${ progress * 50 }%)`;
    aboutText.style.opacity   = progress;
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // … tu código existente …

  // Sólo en pantallas ≤768px
  if (window.innerWidth <= 768) {
    const aboutSections = document.querySelectorAll('.about-pinned');
    const obsMobile = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible-mobile');
        } else {
          entry.target.classList.remove('visible-mobile');
        }
      });
    }, { threshold: 0.3 });

    aboutSections.forEach(sec => obsMobile.observe(sec));
  }
});


// — Fade-out entre about-pinned 1 → 2 —
const aboutSections = Array.from(document.querySelectorAll('.about-pinned'));
if (aboutSections.length > 1) {
  const first = aboutSections[0];
  const second = aboutSections[1];
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        first.classList.add('fade-out');
      } else {
        first.classList.remove('fade-out');
      }
    });
  }, {
    root: null,
    threshold: 0
  });

  fadeObserver.observe(second);
}




