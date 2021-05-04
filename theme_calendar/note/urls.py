from django.urls import path
from .views import NoteView, SharedNoteView, NoteDeleteView

urlpatterns = [
    path('', NoteView.as_view()),
    path('/shared', SharedNoteView.as_view())
    path('/delete', NoteDeleteView.as_view())
]