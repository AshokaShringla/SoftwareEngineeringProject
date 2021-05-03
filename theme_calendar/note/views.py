import json

from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.db import IntegrityError

from .models import Note, SharedNote
from user.models import User
from user.utils import login_decorator


class NoteView(View):
    @login_decorator
    def post(self,request):
        try:
            user = request.user
            contents = request.POST.get('contents')
            Note.objects.create(
                owner = user.id,
                date = str(datetime.date.today()),
                contents = contents
            )
            return JsonResponse({'message':'SUCCESS'}, status = 200)
        except KeyError:
            return JsonResponse({'message':'INVALID_KEYS'},status = 400)

    @login_decorator
    def get(self,request):
        try:
            user = request.user
            notes = Note.objects.filter(owner = user)
            note_list = [{
                'owner' : note.owner.name,
                'date' : note.date,
                'contents' : note.contents
            }for note in notes]
            return JsonResponse(note_list, status = 200)
        except KeyError:
            return JsonResponse({ 'message' : 'INVALID_KEYS' }, status = 400)

    @login_decorator
    def delete(self,request):
        data = json.loads(request.body)
        try:
            user = request.user
            note = Note.objects.get(owner = user, id = data['note_id'])
            note.delete()
            return HttpResponse(status = 200)
        except KeyError:
            return JsonResponse({ 'message' : 'INVALID_KEYS' }, status=400)

class SharedNoteView(View):
    @login_decorator
    def post(self,request):
        data = json.loads(request.body)
        try:
            user = request.user
            share_emails = data['share_user_emails']
            note_id = data['note_id']
            res_object = []
            for email in share_email:
                share_user = User.objects.get(email = email)
                SharedNote.objects.create(
                    user = share_user,
                    note = Note.objects.get(id = note_id)
                )
                res = {
                    'user' : share_user.id,
                    'note' : note_id
                }
                res_object.append(res)
            return JsonResponse({ 'data' : res_object}, status = 200)
        except KeyError:
            return JsonResponse({ 'message' : 'INVALID_KEYS' }, status=400)
    
    # @login_decorator
    # def get(self,request):
    #     try:
    #         user = request.user

            