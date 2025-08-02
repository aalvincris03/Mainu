from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user, current_user, UserMixin
from flask_mail import Mail, Message
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'alvin'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Flask-Mail config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('aalvincris@gmail.com')
app.config['MAIL_PASSWORD'] = os.getenv('qwewer147')
app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']

db = SQLAlchemy(app)
mail = Mail(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# MODELS
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(200))

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

class Lender(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

class Debt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    name_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    amount = db.Column(db.Float, nullable=False)
    reason = db.Column(db.String(200))
    lender_id = db.Column(db.Integer, db.ForeignKey('lender.id'))
    paid = db.Column(db.Boolean, default=False)

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.String(200))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# One-time init route to create tables
@app.route('/initdb')
def initdb():
    db.create_all()
    return "Database tables created nyeee."


#@app.got_first_request
#def create_tables():
    #db.create_all()

@app.route('/')
@login_required
def index():
    debts = Debt.query.all()
    people = Person.query.all()
    lenders = Lender.query.all()
    history = History.query.order_by(History.timestamp.desc()).limit(10).all()
    return render_template('index.html', debts=debts, people=people, lenders=lenders, history=history)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email, password=password).first()
        if user:
            login_user(user)
            return redirect(url_for('index'))
        flash('Invalid credentials', 'danger')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if User.query.filter_by(email=email).first():
            flash('Email already registered', 'warning')
        else:
            db.session.add(User(email=email, password=password))
            db.session.commit()
            flash('Registered successfully', 'success')
            return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/reset-password', methods=['GET', 'POST'])
def reset_password():
    if request.method == 'POST':
        email = request.form['email']
        user = User.query.filter_by(email=email).first()
        if user:
            msg = Message("Reset Password", recipients=[email])
            msg.body = f"Hello, visit the site to reset your password. Your password is: {user.password}"
            mail.send(msg)
            flash('Password sent to your email', 'info')
        else:
            flash('Email not found', 'danger')
    return render_template('reset.html')

# More routes for AJAX-based add/edit/delete/split/toggle will be added here

if __name__ == '__main__':
    app.run(debug=True)
