from flask import Flask, jsonify, request, make_response, session
import json
import os
from flask_cors import CORS
from flask import Flask, render_template, url_for, request, redirect, session, json, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from flask_wtf import FlaskForm
from wtforms_sqlalchemy.fields import QuerySelectField
from datetime import datetime
from datetime import timedelta
from functools import wraps
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
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'

db = SQLAlchemy(app)

def token_required(func):
  @wraps(func)
  def decorated(*args, **kwargs):
    token = request.values.get('token')
    if not token:
      return jsonify({'Alert!': 'Token is missing!'}), 403
    try:
      payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    except:
      return jsonify({'Alert!': 'Invalid Token!'}), 403
    return func(*args, **kwargs)

  return decorated

class Usercredentials(db.Model):
  username = db.Column(db.String(20), primary_key=True)
  password = db.Column(db.String(20))
  email = db.Column(db.String(50))
  information = relationship("Clientinformation", backref = "Usercredentials", passive_deletes = True, uselist=False)
  fuelquote = relationship("Fuelquote", backref = "user", passive_deletes = True, uselist = True)

class Clientinformation(db.Model):
  usercredentials_username = db.Column(db.String(20), db.ForeignKey('usercredentials.username', ondelete = "CASCADE"), primary_key=True)
  fullName = db.Column(db.String(100))
  address1 = db.Column(db.String(50))
  address2 = db.Column(db.String(50))
  city = db.Column(db.String(50))
  state = db.Column(db.String(2))
  zipcode = db.Column(db.Integer)

class Fuelquote(db.Model):
  fuelquoteNum = db.Column(db.Integer, primary_key=True)
  usercredentials_username = db.Column(db.String(20), db.ForeignKey('usercredentials.username', ondelete = "CASCADE"))
  deliveryAddress = db.Column(db.String(50))
  deliveryDate = db.Column(db.Date)
  gallonsRequested = db.Column(db.Integer)
  suggestedPPG = db.Column(db.Float)
  amountDue = db.Column(db.Float)

@app.route('/', methods=['GET'])
def index():
  return "This returns something."

@app.route('/api/profile', methods=['GET', 'POST'])
def profile_endpoint():

  if request.method == 'POST':
    username = request.values.get('username')
    fullname = request.form['fullname']
    if len(fullname) > 50:
      return jsonify({'Alert!': 'Invalid Name!'}), 400
    address1 = request.form['address1']
    if len(address1) > 100:
      return jsonify({'Alert!': 'Invalid Address!'}), 400
    address2 = request.form['address2']
    if len(address2) > 100:
      return jsonify({'Alert!': 'Invalid Address!'}), 400
    city = request.form['city']
    if len(city) > 100:
      return jsonify({'Alert!': 'Invalid City!'}), 400
    state = request.form['state']
    if len(state) != 2:
      return jsonify({'Alert!': 'Invalid State!'}), 400
    zip = request.form['zip']
    if len(zip) < 5 or len(zip) > 9:
      return jsonify({'Alert!': 'Invalid Zipcode!'}), 400

    if len(address2) == 0:
      newaddress2 = "N/A"
    else:
      newaddress2 = address2

    user = Clientinformation.query.filter_by(usercredentials_username = username).first()

    #Updates current user
    if user:
      user.fullName = fullname
      user.address1 = address1
      user.address2 = newaddress2
      user.city = city
      user.state = state
      user.zipcode = zip
      print("updating")
    else: #Creates new user 
      newProfile = Clientinformation(usercredentials_username = username, fullName = fullname, address1 = address1, address2 = newaddress2, city = city, state = state, zipcode = zip)
      db.session.merge(newProfile)

    db.session.commit()
    return "Your data is submitted"

  if request.method == 'GET':
    username = request.values.get('username')
    user = Clientinformation.query.filter_by(usercredentials_username = username).first()

    if user.address2 == 'N/A':
      newAddress2 = ''
    else:
      newAddress2 = user.address2

    dataToReturn = {
      "fullName": user.fullName,
      "address1": user.address1,
      "address2": newAddress2,
      "city": user.city,
      "state": user.state,
      "zipcode": user.zipcode,
    }

    print(dataToReturn)

    return json.dumps(dataToReturn)

@app.route('/api/fuelquote', methods=['GET', 'POST'])
def fuelquote_endpoint():

  if request.method == 'POST':
    username = request.values.get('username')
    
    deliveryAddressTemp = request.form['deliveryAddress']
    deliveryAddress = json.loads(deliveryAddressTemp)
    state = deliveryAddress["state"]
    gallonsRequested = request.form['gallonsRequested']
    if not gallonsRequested.isdigit():
      return jsonify({'Alert!': 'Error somewhere!'}), 400
    deliveryDate = request.form['deliveryDate']
    print(deliveryDate)
    suggestedPrice = request.form['suggestedPrice']
    suggestedPrice = float(suggestedPrice)
    if not isinstance(suggestedPrice, float):
      return jsonify({'Alert!': 'Error somewhere!'}), 400
    amountDue = request.form['amountDue']
    amountDue = float(amountDue)
    if not isinstance(amountDue, float):
      return jsonify({'Alert!': 'Error somewhere!'}), 400

    newFuelQuote = Fuelquote(usercredentials_username = username, deliveryAddress = deliveryAddress["address"], deliveryDate = deliveryDate, gallonsRequested = gallonsRequested, suggestedPPG = suggestedPrice, amountDue = amountDue)
    db.session.merge(newFuelQuote)
    db.session.commit()
    return "Success"
  
  if request.method == 'GET':
    username = request.values.get('username')

    user = Clientinformation.query.filter_by(usercredentials_username = username).first()
    userHistory = Fuelquote.query.filter_by(usercredentials_username = username).first()

    if userHistory:
      history = True
    else:
      history = False

    if user:
      dataToReturn = {
        "fullName": user.fullName,
        "address1": user.address1,
        "address2": user.address2,
        "city": user.city,
        "state": user.state,
        "zipcode": user.zipcode,
        "history": history
      }
      return json.dumps(dataToReturn)
    
    else:
      return jsonify({'Alert!': 'Error somewhere!'}), 400


@app.route('/api/register', methods=['GET', 'POST'])
def register_endpoint():
  if request.method == 'POST':
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    hashed_password = generate_password_hash(password, method='sha256')

    user = Usercredentials.query.filter_by(username=username).first()

    if user:
       return make_response('Username taken!', 403)

    newUser = Usercredentials(username = username, password = hashed_password, email = email)

    db.session.merge(newUser)
    db.session.commit()
    
    token = jwt.encode({
      'username': request.form['username'],
      'expiration': str(datetime.datetime.utcnow() + timedelta(minutes=30)),
    }, app.config['SECRET_KEY'])


    return {'token': token}

@app.route('/api/login', methods=['GET', 'POST'])
def login_endpoint():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']

    user = Usercredentials.query.filter_by(username=username).first()

    if not user:
      return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication failed!"'})
    
    if check_password_hash(user.password, password):
      token = jwt.encode({
      'username': request.form['username'],
      'expiration': str(datetime.datetime.utcnow() + timedelta(minutes=30)),
      }, app.config['SECRET_KEY'])

      return {'token': token}

    return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication failed!"'})

@app.route('/api/history', methods=['GET'])
def history_endpoint():
  username = request.values.get('username')

  #history = Fuelquote.query.filter_by(usercredentials_username = username).first()

  history = db.session.query(Fuelquote)
  history = history.all()
  data = []

  for i in history:
    if (username in i.usercredentials_username) is True:
      data.append({"quoteNumber": str(i.fuelquoteNum), "deliveryAddress": str(i.deliveryAddress), "deliveryDate": str(i.deliveryDate), "gallonsRequested": str(i.gallonsRequested), "suggestedPrice": str(i.suggestedPPG), "totalAmount": str(i.amountDue)})
  
  db.session.commit()

  if history:
    return json.dumps(data)

  else:
    return jsonify({'No history found!'})

