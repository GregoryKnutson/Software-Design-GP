from flask import Flask, jsonify, request, make_response, session
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
  return "This returns something! Awesome!"

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
    return "Thank you!"

@app.route('/api/login', methods=['GET', 'POST'])
def login_endpoint():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    return "Thank you!"
