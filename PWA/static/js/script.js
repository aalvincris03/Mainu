document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const icon = document.getElementById('themeIcon');

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', newTheme);
    icon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  });

  function showToast(message) {
    const toast = new bootstrap.Toast(document.getElementById('mainToast'));
    document.getElementById('toastMsg').textContent = message;
    toast.show();
  }

  // Dummy charts
  const pieCtx = document.getElementById('pieChart');
  const barCtx = document.getElementById('barChart');
  if (pieCtx && barCtx) {
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Alice', 'Bob', 'Charlie'],
        datasets: [{ label: 'Debt Share', data: [40, 30, 30], backgroundColor: ['#0d6efd', '#198754', '#dc3545'] }]
      }
    });
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Paid', 'Unpaid'],
        datasets: [{ label: 'Amount', data: [1500, 2500], backgroundColor: ['#198754', '#dc3545'] }]
      }
    });
  }

  // TODO: Hook up search, filter, table update, AJAX, etc.
});
