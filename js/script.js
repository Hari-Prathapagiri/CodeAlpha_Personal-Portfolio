// not going overboard here — just the bits we actually need.

// --- menu (mobile) ---
const sideToggle = document.querySelector('.side__toggle');
const nav = document.querySelector('.nav');
if (sideToggle && nav) {
  sideToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}

// --- theme toggle + persistence ---
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('ph-theme');
if (saved === 'dark') document.documentElement.classList.add('dark');

if (themeBtn) {
  // set icon
  themeBtn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    themeBtn.textContent = mode === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('ph-theme', mode);
  });
}

// --- active link highlight by page ---
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(a => {
  if (a.getAttribute('href') === here) a.classList.add('is-active');
});

// --- reveal on scroll (IntersectionObserver) ---
const toReveal = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      obs.unobserve(e.target); // reveal once
    }
  });
},{ threshold: 0.15 });

toReveal.forEach(el => obs.observe(el));
