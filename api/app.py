from flask import Flask, jsonify, request, make_response, session
import json
import os

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
  return "This returns something! Awesome!"

@app.route('/api/fuelquote', methods=['GET', 'POST'])
def fuelquote_endpoint():


    deliveryAddressTemp = request.form['deliveryAddress']
    deliveryAddress = json.loads(deliveryAddressTemp)
    gallonsRequested = request.form['gallonsRequested']
    deliveryDate = request.form['deliveryDate']
    suggestedPrice = request.form['suggestedPrice']
    amountDue = request.form['amountDue']

    print(deliveryAddress)
    print(gallonsRequested)
    print(deliveryDate)
    print(suggestedPrice)
    print(amountDue)


    
    return gallonsRequested