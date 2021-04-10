import json
import bcrypt

from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.db import IntegrityError

from .models import User

class SignUpView(View):
    def post(self,request):
        try:
            data = json.loads(request.body)
            password = bcrypt.hashpw(data['password'].encode('utf-8'),bcrypt.gensalt())
            crypted = password.decode('utf-8')
            User.objects.create(
                name = data['name'],
                email = data['email'],
                password = crypted
            )
            return JsonResponse({"message" : "SUCCESS"}, status = 200)
        except KeyError:
            return JsonResponse({'message':'INVALID_KEYS'},status = 400)
        except IntegrityError:
            return JsonResponse({'message':'DUPLICATE_ENTRIES'},status = 400)


