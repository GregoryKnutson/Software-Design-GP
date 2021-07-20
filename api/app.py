from flask import Flask, jsonify, request, make_response, session
import json
import os
from flask_cors import CORS
from flask import Flask, render_template, url_for, request, redirect, session, json, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms_sqlalchemy.fields import QuerySelectField
from datetime import datetime
from datetime import timedelta
import random
import pymysql
import hashlib
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

pymysql.install_as_MySQLdb

app = Flask(__name__)
CORS(app)

with open('password.txt') as f:
    lines = [line.rstrip() for line in f] 
username = lines[0]
password = lines[1]

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://' + username +':' + password +'@us-cdbr-east-04.cleardb.com/heroku_e7fd00659a64d84'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'

db = SQLAlchemy(app)

class usercredentials(db.Model):
  username = db.Column(db.String(20), primary_key=True)
  password = db.Column(db.String(20))
  email = db.Column(db.String(50))



@app.route('/', methods=['GET'])
def index():
  return "This returns something."

@app.route('/api/profile', methods=['GET', 'POST'])
def profile_endpoint():
  fullname = request.form['fullname']
  if len(fullname) > 50:
    return jsonify({'Alert!': 'Error somewhere!'}), 400
  address1 = request.form['address1']
  if len(address1) > 100:
    return jsonify({'Alert!': 'Error somewhere!'}), 400
  address2 = request.form['address2']
  if len(address2) > 100:
    return jsonify({'Alert!': 'Error somewhere!'}), 400
  city = request.form['city']
  if len(city) > 100:
    return jsonify({'Alert!': 'Error somewhere!'}), 400
  state = request.form['state']
  if len(state) != 2:
    return jsonify({'Alert!': 'Error somewhere!'}), 400
  zip = request.form['zip']
  if len(zip) < 5 or len(zip) > 9:
    return jsonify({'Alert!': 'Error somewhere!'}), 400

  return "Your data is submitted"

@app.route('/api/fuelquote', methods=['GET', 'POST'])
def fuelquote_endpoint():

  if request.method == 'POST':
    deliveryAddressTemp = request.form['deliveryAddress']
    deliveryAddress = json.loads(deliveryAddressTemp)
    state = deliveryAddress["state"]
    gallonsRequested = request.form['gallonsRequested']
    if not gallonsRequested.isdigit():
      return jsonify({'Alert!': 'Error somewhere!'}), 400
    deliveryDate = request.form['deliveryDate']
    suggestedPrice = request.form['suggestedPrice']
    if not suggestedPrice.isdigit():
      return jsonify({'Alert!': 'Error somewhere!'}), 400
    amountDue = request.form['amountDue']
    if not amountDue.isdigit():
      return jsonify({'Alert!': 'Error somewhere!'}), 400
    
  return ""

@app.route('/api/register', methods=['GET', 'POST'])
def register_endpoint():
  if request.method == 'POST':
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    hashed_password = generate_password_hash(password, method='sha256')

    user = usercredentials.query.filter_by(username=username).first()

    if user:
       return make_response('Username taken!', 403)

    newUser = usercredentials(username = username, password = hashed_password, email = email)

    db.session.merge(newUser)
    db.session.commit()
    
    token = jwt.encode({
      'username': request.form['username'],
      'expiration': str(datetime.datetime.utcnow() + timedelta(minutes=30)),
    }, app.config['SECRET_KEY'])

    print(token)

    return {'token': token}

@app.route('/api/login', methods=['GET', 'POST'])
def login_endpoint():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']

    user = usercredentials.query.filter_by(username=username).first()

    if not user:
      return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication failed!"'})
    
    if check_password_hash(user.password, password):
      token = jwt.encode({
      'username': request.form['username'],
      'expiration': str(datetime.datetime.utcnow() + timedelta(minutes=30)),
      }, app.config['SECRET_KEY'])

      print(token)
      return {'token': token}



    return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication failed!"'})

