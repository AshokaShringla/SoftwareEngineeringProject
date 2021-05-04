import json
import datetime

from django.views import View
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.db import IntegrityError

from .models import Note, SharedNote
from user.models import User
from user.utils import login_decorator
from django.db.models import Q


class NoteView(View):
    @login_decorator
    def post(self,request):
        try:
            data = json.loads(request.body)
            user = request.user
            contents = data["contents"]
            Note.objects.create(
                owner = user,
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
            return JsonResponse(note_list, safe=False, status = 200)
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
            share_email = data['share_user_email']
            note_id = data['note_id']
            share_user = User.objects.get(email = share_email)
            SharedNote.objects.create(
                user = share_user,
                note = Note.objects.get(id = note_id)
            )
            return HttpResponse(status = 200)
        except KeyError:
            return JsonResponse({ 'message' : 'INVALID_KEYS' }, status=400)

    @login_decorator
    def get(self,request):
        try:
            user = request.user
            shared_notes = Note.objects.prefetch_related('sharednote_set').all()
            shared_notes.filter(
                Q(owner = user.id) |
                Q(shared = user.id)
            ).distinct()
            result = [{
                'owner' : note.owner.name,
                'date': note.date,
                'contents' : note.contents,
                'shared' : [{
                    'name' : n.user.name,
                    'email' : n.user.email
                }for n in note.sharednote_set.all()]
            }for note in shared_notes]
            return JsonResponse({'data' : result}, status = 200)
        except KeyError:
            return JsonResponse({ 'message' : 'INVALID_KEYS' }, status=400)
