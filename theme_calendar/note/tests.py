from django.test import TestCase, Client
import json

client = Client()

class NoteTest(TestCase):
    data = {
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signin', json.dumps(data), content_type = 'application/json')

        self.assertEqual(response.status_code, 200)
        token = response.token

    def test_note_post_success(self):
        data = {
            'contents' : 'this is a note'
        }
        client.credentials(HTTP_AUTHORIZATION=token)
        response = client.post('/note', json.dumps(data), content_type = 'application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(),{
            "message" : "SUCCESS"
        })

    def test_note_get_success(self):
        client.credentials(HTTP_AUTHORIZATION=token)
        response = client.get('/note')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['owner'],'Raina')

    def test_note_delete_success(self):
        data = {
            'note_id' : 1,
        }
        client.credentials(HTTP_AUTHORIZATION=token)
        response = client.delete('/note', json.dumps(data), content_type = 'application/json')

        self.assertEqual(response.status_code, 200)

class SharedNoteTest(TestCase):
    data = {
            'email'     : 'qwer@nyu.edu',
            'password'  : '123123'
        }
        response = client.post('/user/signin', json.dumps(data), content_type = 'application/json')

        self.assertEqual(response.status_code, 200)
        token = response.token


