// Toggle dark/light mode
document.getElementById('themeToggle').addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-bs-theme');
  html.setAttribute('data-bs-theme', current === 'dark' ? 'light' : 'dark');
});

// Utility: Serialize form data to object
function getFormData(form) {
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => {
    if (key in obj) {
      if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  });
  return obj;
}

// Add debt
function addDebt(event) {
  event.preventDefault();
  const form = event.target;
  const data = getFormData(form);
  data.status = form.status.checked; // checkbox handling

  fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        location.reload();
      } else {
        alert('Failed to add debt.');
      }
    });
}

// Edit debt
function editDebt(event, id) {
  event.preventDefault();
  const form = event.target;
  const data = getFormData(form);
  data.status = form.status.checked;

  fetch(`/edit/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        location.reload();
      } else {
        alert('Failed to edit debt.');
      }
    });
}

// Delete debt
function deleteDebt(event, id) {
  event.preventDefault();

  fetch(`/delete/${id}`, {
    method: 'POST'
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        location.reload();
      } else {
        alert('Failed to delete debt.');
      }
    });
}

// Split debt
function splitDebt(event) {
  event.preventDefault();
  const form = event.target;
  const data = getFormData(form);
  const names = Array.isArray(data.names) ? data.names : [data.names];
  data.names = names;

  fetch('/split', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        location.reload();
      } else {
        alert('Failed to split debt.');
      }
    });
}
