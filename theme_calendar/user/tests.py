from django.test import TestCase, Client
import json

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
            "message" : "SUCCESS"
        })