const heroVideo = document.getElementById('heroVideo');
const heroSources = [
  'assets/video/loop-12.mp4',
  'assets/video/loop-10.mp4',
  'assets/video/loop-4.mp4',
  'assets/video/loop-7.mp4',
  'assets/video/loop-1.mp4'
];
let heroIndex = 0;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && heroVideo) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSources.length;
    heroVideo.classList.add('switching');
    setTimeout(() => {
      heroVideo.src = heroSources[heroIndex];
      heroVideo.load();
      heroVideo.play().catch(() => {});
      setTimeout(() => heroVideo.classList.remove('switching'), 120);
    }, 330);
  }, 7600);
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

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    if (entry.isIntersecting) {
      if (!video.src) {
        video.src = video.dataset.src;
        video.load();
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}, { rootMargin: '200px 0px', threshold: 0.05 });
document.querySelectorAll('.lazy-video').forEach(v => videoObserver.observe(v));

document.getElementById('year').textContent = new Date().getFullYear();
