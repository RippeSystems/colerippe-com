const heroVideo = document.getElementById('heroVideo');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hero is intentionally locked to the opening takeoff sequence from loop 12.
// Restart before the aftermath section so the top of the page continuously
// repeats the portrait → lightning → lift-off moment.
const HERO_LOOP_START = 0;
const HERO_LOOP_END = 6.4;

if (heroVideo) {
  heroVideo.addEventListener('timeupdate', () => {
    if (heroVideo.currentTime >= HERO_LOOP_END) {
      heroVideo.currentTime = HERO_LOOP_START;
      if (!reduceMotion) heroVideo.play().catch(() => {});
    }
  });

  heroVideo.addEventListener('loadedmetadata', () => {
    if (heroVideo.currentTime > HERO_LOOP_END) {
      heroVideo.currentTime = HERO_LOOP_START;
    }
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = Number(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('in'), delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
