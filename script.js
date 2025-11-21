(() => {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsTilt = typeof VanillaTilt !== 'undefined';

  if (!supportsTilt || reduceMotion) return;

  const container = document.querySelector('.container');
  if (container) {
    VanillaTilt.init(container, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02
    });
  }

  document.querySelectorAll('.link').forEach((el) => {
    VanillaTilt.init(el, {
      max: 5,
      speed: 400,
      glare: false,
      scale: 1.01
    });
  });
})();