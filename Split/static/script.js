document.addEventListener('DOMContentLoaded', () => {
    const stored = localStorage.getItem('theme');
    if (stored) {
        document.documentElement.setAttribute('data-bs-theme', stored);
    }
    document.getElementById('themeToggle').addEventListener('click', () => {
        const html = document.documentElement;
        const dark = html.getAttribute('data-bs-theme') === 'dark';
        html.setAttribute('data-bs-theme', dark ? 'light' : 'dark');
        localStorage.setItem('theme', dark ? 'light' : 'dark');
    });
});

function addDebt(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  fetch('/add', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(() => location.reload());
}

function splitDebt(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const names = formData.getAll("names");
  const data = {
    date: formData.get("date"),
    names: names,
    amount: formData.get("amount"),
    reason: formData.get("reason"),
    lender: formData.get("lender")
  };
  fetch('/split', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(() => location.reload());
}

function editDebt(e, id) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  fetch('/edit/' + id, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(() => location.reload());
}

function deleteDebt(e, id) {
  e.preventDefault();
  fetch('/delete/' + id, {method: 'POST'}).then(() => location.reload());
}
