from django.db import models
from user.models import User

class Note(models.Model):
    owner           = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    date            = models.CharField(max_length = 500, null = True)
    contents	    = models.CharField(max_length = 2000, null = True) 
    shared          = models.ManyToManyField(User, through='SharedNote', related_name = 'shared_note')

    class Meta:
        db_table = 'notes'

class SharedNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.ForeignKey(Note, on_delete=models.CASCADE)

    class Meta:
        db_table = 'shared_notes'