const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme() {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function updateThemeControl() {
  if (!themeToggle) return;

  const darkThemeIsActive = currentTheme() === 'dark';
  const nextTheme = darkThemeIsActive ? 'light' : 'dark';
  const label = `Switch to ${nextTheme} theme`;

  themeToggle.setAttribute('aria-label', label);
  themeToggle.setAttribute('title', label);
  themeToggle.setAttribute('aria-pressed', String(darkThemeIsActive));
}

function setTheme(theme, remember = true) {
  root.dataset.theme = theme;
  updateThemeControl();

  if (remember) {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {}
  }
}

if (themeToggle) {
  updateThemeControl();
  themeToggle.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
}

prefersDark.addEventListener('change', (event) => {
  try {
    if (localStorage.getItem('theme')) return;
  } catch (error) {}

  setTheme(event.matches ? 'dark' : 'light', false);
});

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll(
  'main > section:not(.hero), .project-card, .strength-grid article, .featured-card, .more-work-card, .timeline-item'
);

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
