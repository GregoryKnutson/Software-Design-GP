from api import Clientinformation
from api import Usercredentials
import unittest
import json
from flask import Flask
from unittest.mock import patch
from flask.globals import request
from api import app, db
from flask_jwt_extended import create_access_token


class FlaskTest(unittest.TestCase):

    CURR_USERNAME = "Test123"

    FUELQUOTE_ADDRESS= {
        "address":"1234 Test Address",
        "city":"City",
        "state":"TX",
        "zip":"77423"
    }

    FUELQUOTE_OBJ={
        "gallonsRequested":12,
        "deliveryAddress":json.dumps(FUELQUOTE_ADDRESS),
        "deliveryDate":"1233-01-02",
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
    PROFILE_OBJ2={
        "fullname":"Bob Smith",
        "address1": "1234 Test Address",
        "address2": "12345 Test Address",
        "city": "Houston",
        "state":"TX",
        "zip":"123456"
    }
    REGISTER_OBJ={
        "username":CURR_USERNAME,
        "email":CURR_USERNAME,
        "password":"pass123"
    }
    LOGIN_OBJ={
        "username":"admin",
        "password":"pass123"
    }
    FUELQUOTE_OBJ_BROKEN1={
        "gallonsRequested":"a",
        "deliveryAddress":json.dumps(FUELQUOTE_ADDRESS),
        "deliveryDate":"1233-01-02",
        "suggestedPrice":12,
        "amountDue":500
    }
    FUELQUOTE_OBJ_BROKEN2={
        "gallonsRequested":12,
        "deliveryAddress":json.dumps(FUELQUOTE_ADDRESS),
        "deliveryDate":"1233-01-02",
        "suggestedPrice":"A",
        "amountDue":"500"
    }
    FUELQUOTE_OBJ_BROKEN3={
        "gallonsRequested":12,
        "deliveryAddress":json.dumps(FUELQUOTE_ADDRESS),
        "deliveryDate":"1233-01-02",
        "suggestedPrice":"12",
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
    PRICING_OBJ = {
        "state":"TX",
        "gallonsRequested": "1500"
    }

    def test1_home(self):
        tester= app.test_client(self)
        response= tester.get('http://localhost:5000/')
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

    def test20_pricing(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:5000/api/pricing?username=' + FlaskTest.CURR_USERNAME,
        data = FlaskTest.PRICING_OBJ)
        responseData = json.loads(response.get_data(as_text=True))
        self.assertEqual(responseData['tempSuggestedPPG'], '1.71')

    def test21_pricing(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:5000/api/pricing?username=' + FlaskTest.CURR_USERNAME,
        data = FlaskTest.PRICING_OBJ)
        responseData = json.loads(response.get_data(as_text=True))
        self.assertEqual(responseData['tempAmountDue'], '2565.0')

    def test2_fuelquote(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/fuelquote?username=' + FlaskTest.CURR_USERNAME,
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
        response= tester.post('http://localhost:8080/api/profile?username=' + FlaskTest.CURR_USERNAME,
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

    def test13_register(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/register',
        data=FlaskTest.REGISTER_OBJ)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)
    
    def test14_login(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/login',
        data=FlaskTest.LOGIN_OBJ)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

    def test15_profile(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile?username=' + FlaskTest.CURR_USERNAME,
        data=FlaskTest.PROFILE_OBJ2)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

    def test16_updateprofile(self):
        tester= app.test_client(self)
        response= tester.post('http://localhost:8080/api/profile?username=' + FlaskTest.CURR_USERNAME,
        data=FlaskTest.PROFILE_OBJ)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

    def test17_getprofile(self):
        tester= app.test_client(self)
        response= tester.get('http://localhost:5000/api/profile?username=' + FlaskTest.CURR_USERNAME)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

    def test18_getfuelquote(self):
        tester= app.test_client(self)
        response= tester.get('http://localhost:5000/api/fuelquote?username=' + FlaskTest.CURR_USERNAME)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

    def test19_gethistory(self):
        tester= app.test_client(self)
        response= tester.get('http://localhost:5000/api/history?username=' + FlaskTest.CURR_USERNAME)
        statuscode= response.status_code
        self.assertEqual(statuscode, 200)

        

if __name__== "__main__":
    unittest.main()
