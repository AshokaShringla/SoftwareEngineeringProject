from django.urls import path
from .views import NoteView

urlpatterns = [
    path('', NoteView.as_view()),
    # path('/shared', SharedNoteView.as_view())
]