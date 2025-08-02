document.getElementById('themeToggle').addEventListener('click', function () {
  const html = document.documentElement;
  const current = html.getAttribute('data-bs-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', newTheme);
  document.getElementById('themeIcon').textContent = newTheme === 'dark' ? '🌙' : '☀️';
});
