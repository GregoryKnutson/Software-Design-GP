from flask import Flask, jsonify, request, make_response, session
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
  return "This returns something! Awesome!"

@app.route('/api/fuelquote', methods=['GET', 'POST'])
def fuelquote_endpoint():

  if request.method == 'POST':
    deliveryAddressTemp = request.form['deliveryAddress']
    deliveryAddress = json.loads(deliveryAddressTemp)
    state = deliveryAddress["state"]
    gallonsRequested = request.form['gallonsRequested']
    deliveryDate = request.form['deliveryDate']
    suggestedPrice = request.form['suggestedPrice']
    amountDue = request.form['amountDue']

    print(state)


    
  return ""

@app.route('/api/login', methods=['GET', 'POST'])
def login_endpoint():
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']

    
  return ""