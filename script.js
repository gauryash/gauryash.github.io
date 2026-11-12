const themeButton = document.getElementById('theme-toggle');
const preferredDark = matchMedia('(prefers-color-scheme: dark)');

try { document.documentElement.dataset.theme = localStorage.getItem('portfolio-theme') || ''; } catch {}

function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark' ||
    (!document.documentElement.dataset.theme && preferredDark.matches);
  themeButton.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}

themeButton.addEventListener('click', () => {
  document.documentElement.dataset.theme = themeButton.getAttribute('aria-label') === 'Switch to light mode' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', document.documentElement.dataset.theme); } catch {}
  updateThemeButton();
});

preferredDark.addEventListener('change', updateThemeButton);
const sections = [...document.querySelectorAll('main > .view')];
const tabs = [...document.querySelectorAll('.tab')];
function renderSection() {
  const name = location.hash.replace('#/', '');
  const section = sections.find(item => item.id === name) || sections[0];
  for (const item of sections) item.hidden = item !== section;
  for (const tab of tabs) {
    if (tab.hash === `#/${section.id}`) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', renderSection);
window.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
      /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '') ||
      document.activeElement?.isContentEditable) return;
  const target = { '1': '#/home', '2': '#/craft', '3': '#/work' }[event.key];
  if (target) location.hash = target;
});

updateThemeButton();
renderSection();
