from django.test import TestCase, Client
import json
from user.models import User
import bcrypt, jwt

client = Client()

class SignUpTest(TestCase):
    def test_signup_post_success(self):
        data = {
            'name'      : 'Raina',
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signup', json.dumps(data), content_type = 'application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(),{
            'email' : 'qwer@nyu.edu',
            'name' : 'Raina',
            'password' : '123123'
        })
        

class SignInTest(TestCase):
    def test_signin_post_success(self):
        password = bcrypt.hashpw('123123'.encode('utf-8'),bcrypt.gensalt())
        crypted = password.decode('utf-8')
        User.objects.create(name = 'Raina',email = 'qwer@nyu.edu', password = crypted)

        data = {
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signin', json.dumps(data), content_type = 'application/json')
        self.assertEqual(response.status_code, 200)
        
