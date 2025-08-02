from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'alvin'
db = SQLAlchemy(app)

# Models
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

# One-time init route to create tables
@app.route('/initdb')
def initdb():
    db.create_all()
    return "Database tables created nyeee."


@app.route('/')
def index():
    debts = Debt.query.all()
    people = Person.query.all()
    lenders = Lender.query.all()
    return render_template('index.html', debts=debts, people=people, lenders=lenders)

# Additional routes for CRUD, status toggle, split logic, and AJAX updates would go here.

if __name__ == '__main__':
    app.run(debug=True)
