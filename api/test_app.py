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
    PROFILE_OBJ={
        "fullname":"Bob Smith",
        "address1": "1234 Test Address",
        "address2": "",
        "city": "Houston",
        "state":"TX",
        "zip":"123456"
    }
    FUELQUOTE_OBJ_BROKEN1={
        "gallonsRequested":"a",
        "deliveryAddress":json.dumps(FUELQUOTE_ADDRESS),
        "deliveryDate":"Wed Jul 14 2021 14:29:00 GMT-0500 (Eastern Standard Time)",
        "suggestedPrice":12,
        "amountDue":500
    }
    FUELQUOTE_OBJ_BROKEN2={
        "gallonsRequested":12,
        "deliveryAddress":json.dumps(FUELQUOTE_ADDRESS),
        "deliveryDate":"Wed Jul 14 2021 14:29:00 GMT-0500 (Eastern Standard Time)",
        "suggestedPrice":"A",
        "amountDue":500
    }
    FUELQUOTE_OBJ_BROKEN3={
        "gallonsRequested":12,
        "deliveryAddress":json.dumps(FUELQUOTE_ADDRESS),
        "deliveryDate":"Wed Jul 14 2021 14:29:00 GMT-0500 (Eastern Standard Time)",
        "suggestedPrice":12,
        "amountDue":"A"
    }
    PROFILE_OBJ_BROKEN1={
        "fullname":"Bob Smiths Bob Smiths Bob Smiths Bob Smiths Bob Smiths Bob Smiths Bob Smiths Bob Smiths Bob Smiths Bob Smiths",
        "address1": "1234 Test Address",
        "address2": "",
        "city": "Houston",
        "state":"TX",
        "zip":"123456"
    }
    PROFILE_OBJ_BROKEN2={
        "fullname":"Bob Smith",
        "address1": "1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address",
        "address2": "",
        "city": "Houston",
        "state":"TX",
        "zip":"123456"
    }
    PROFILE_OBJ_BROKEN3={
        "fullname":"Bob Smith",
        "address1": "1234 Test Address",
        "address2": "1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address 1234 Test Address",
        "city": "Houston",
        "state":"TX",
        "zip":"123456"
    }
    PROFILE_OBJ_BROKEN4={
        "fullname":"Bob Smith",
        "address1": "1234 Test Address",
        "address2": "",
        "city": "Houston Houston Houston Houston Houston Houston Houston Houston Houston Houston Houston Houston Houston",
        "state":"TX",
        "zip":"123456"
    }
    PROFILE_OBJ_BROKEN5={
        "fullname":"Bob Smith",
        "address1": "1234 Test Address",
        "address2": "",
        "city": "Houston",
        "state":"Texas",
        "zip":"123456"
    }
    PROFILE_OBJ_BROKEN6={
        "fullname":"Bob Smith",
        "address1": "1234 Test Address",
        "address2": "",
        "city": "Houston",
        "state":"TX",
        "zip":"123"
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

    def test3_fuelquote_broken1(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/fuelquote',
        data=FlaskTest.FUELQUOTE_OBJ_BROKEN1)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)

    def test4_fuelquote_broken2(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/fuelquote',
        data=FlaskTest.FUELQUOTE_OBJ_BROKEN2)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)

    def test5_fuelquote_broken3(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/fuelquote',
        data=FlaskTest.FUELQUOTE_OBJ_BROKEN3)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)

    def test6_profile(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile',
        data=FlaskTest.PROFILE_OBJ)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

    def test7_profile_broken1(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile',
        data=FlaskTest.PROFILE_OBJ_BROKEN1)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)

    def test8_profile_broken2(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile',
        data=FlaskTest.PROFILE_OBJ_BROKEN2)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)

    def test9_profile_broken3(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile',
        data=FlaskTest.PROFILE_OBJ_BROKEN3)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)

    def test10_profile_broken4(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile',
        data=FlaskTest.PROFILE_OBJ_BROKEN4)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)

    def test11_profile_broken5(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile',
        data=FlaskTest.PROFILE_OBJ_BROKEN5)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)

    def test12_profile_broken6(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile',
        data=FlaskTest.PROFILE_OBJ_BROKEN6)
        statuscode= response.status_code
        self.assertEqual(statuscode, 400)


if __name__== "__main__":
    unittest.main()
