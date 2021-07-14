import unittest
import json
from flask import Flask
from unittest.mock import patch
from flask.globals import request
from app import app

class FlaskTest(unittest.TestCase):

    FUELQUOTE_ADDRESS= {
        "address":"1234 Test Address",
        "city":"City",
        "state":"TX",
        "zip":"77423"
    }

    FUELQUOTE_OBJ={
        "gallonsRequested":12,
        "deliveryAddress":json.dumps(FUELQUOTE_ADDRESS),
        "deliveryDate":"Wed Jul 14 2021 14:29:00 GMT-0500 (Eastern Standard Time)",
        "suggestedPrice":12,
        "amountDue":500
    }

    def test1_home(self):
        tester= app.test_client(self)
        response= tester.get('http://localhost:5000/')
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

    def test2_fuelquote(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/fuelquote',
        data=FlaskTest.FUELQUOTE_OBJ)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

if __name__== "__main__":
    unittest.main()
