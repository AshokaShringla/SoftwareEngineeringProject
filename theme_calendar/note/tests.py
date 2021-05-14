from django.test import TestCase, Client
import json
from .models import Note
from user.models import User
import bcrypt, jwt

client = Client()

token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InF3ZXJAbnl1LmVkdSJ9.OQsrVijaa1Ec9s2bZ-GNvrw3TIR3V4L5LkFz026EEGU'
client.defaults['HTTP_AUTHORIZATION'] = token

class NoteTest(TestCase):  
    def test_note_post_success(self):
        data = {
            'name'      : 'Raina',
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signup', json.dumps(data), content_type = 'application/json')
        data = {
            'contents' : 'this is a note'
        }
        response = client.post('/note', json.dumps(data), content_type = 'application/json')

        self.assertEqual(response.status_code, 200)

    def test_note_get_success(self):
        data = {
            'name'      : 'Raina',
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signup', json.dumps(data), content_type = 'application/json')
        response = client.get('/note')

        self.assertEqual(response.status_code, 200)

    def test_note_delete_success(self):
        data = {
            'name'      : 'Raina',
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signup', json.dumps(data), content_type = 'application/json')
        owner = User.objects.get(id = 1)
        Note.objects.create(id = 1, owner = owner, contents = "hi")
        data = {
            'id' : 1,
        }
        response = client.post('/note/delete', json.dumps(data), content_type = 'application/json')

        self.assertEqual(response.status_code, 200)

class SharedNoteTest(TestCase):
    def test_sharednote_post_success(self):
        data = {
            'name'      : 'Raina',
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signup', json.dumps(data), content_type = 'application/json')
        data = {
            'name'      : 'Ashoka',
            'email'     : 'ash@nyu.edu',
            'password'  : '456456'
        }
        response = client.post('/user/signup', json.dumps(data), content_type = 'application/json')

        data = {
            'contents' : 'shared note'
        }
        response = client.post('/note', json.dumps(data), content_type = 'application/json') 
        note_id = Note.objects.get(contents = "shared note").id
        data = {
            'share_user_email' : 'ash@nyu.edu',
            'note_id' : note_id
        }
        response = client.post('/note/shared', json.dumps(data), content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

    def test_sharednote_get_success(self):
        data = {
            'name'      : 'Raina',
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signup', json.dumps(data), content_type = 'application/json')
        response = client.get('/note/shared')
        self.assertEqual(response.status_code, 200)


