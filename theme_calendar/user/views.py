import json
import bcrypt, jwt

from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.db import IntegrityError

from .models import User
from my_settings import SECRET_KEY

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
            res_object = {
                "name" : data['name'],
                "email" : data['email'],
                "password" : data['password']
            }
            return JsonResponse(res_object, status=200)
        except KeyError:
            return JsonResponse({'message':'INVALID_KEYS'},status = 400)
        except IntegrityError:
            return JsonResponse({'message':'DUPLICATE_ENTRIES'},status = 400)


class SignInView(View):
    def post(self,request):
        data = json.loads(request.body)
        try:
            if User.objects.filter(email = data['email']).exists():
                user = User.objects.get(email = data['email'])
                if bcrypt.checkpw(data['password'].encode('utf-8'),user.password.encode('utf-8')):
                    token = jwt.encode({'email':data['email']}, SECRET_KEY['SECRET_KEY'],algorithm = 'HS256')
                    res_object = {
                        "name" : user.name,
                        "email" : data['email'],
                        "password" : data['password'],
                        "token" : token.decode('utf-8')
                    }
                    return JsonResponse(res_object, status = 200)
                else:
                    return JsonResponse({'message':'INVALID_USER'}, status = 401)
            else:
                return JsonResponse({'message':'INVALID_USER'}, status = 401)
        except KeyError:
            return JsonResponse({'message':'INVALID_KEYS'}, status = 400)
