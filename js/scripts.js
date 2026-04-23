const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
const projectSearch = document.getElementById('projectSearch');
const projectCards = [...document.querySelectorAll('.project-card')];
const projectEmpty = document.getElementById('projectEmpty');
const yearEl = document.getElementById('year');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') body.classList.add('dark');

const updateThemeIcon = () => {
  if (!themeToggle) return;
  themeToggle.innerHTML = body.classList.contains('dark')
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
};
updateThemeIcon();

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
});

navToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

projectSearch?.addEventListener('input', (event) => {
  const term = event.target.value.trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const text = card.dataset.project.toLowerCase() + ' ' + card.textContent.toLowerCase();
    const show = text.includes(term);
    card.hidden = !show;
    if (show) visibleCount += 1;
  });

  projectEmpty.hidden = visibleCount !== 0;
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];

const setActiveLink = () => {
  const current = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 120 && rect.bottom >= 120;
  })?.id;

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

document.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

if (yearEl) yearEl.textContent = new Date().getFullYear();
