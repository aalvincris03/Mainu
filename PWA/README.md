# Utang Tracker Pro

A full-featured debt tracker with:
- Live AJAX-based CRUD
- Search & filters
- Summary charts
- Full history logs
- Email-based authentication with password reset
- Responsive mobile-first layout
- Item split logic for shared expenses
- Toast alerts for feedback
- PWA install support

## Setup Instructions

1. Install dependencies:
```bash
pip install flask flask_sqlalchemy flask_login flask_mail
```

2. Set up environment variables (for email):
```bash
export MAIL_USERNAME='you@example.com'
export MAIL_PASSWORD='your-password'
```

3. Run the app:
```bash
python app.py
```

4. App will be available at http://localhost:5000
