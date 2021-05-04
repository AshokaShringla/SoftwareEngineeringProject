from django.urls import path
from .views import NoteView, SharedNoteView

urlpatterns = [
    path('', NoteView.as_view()),
    path('/shared', SharedNoteView.as_view())
]