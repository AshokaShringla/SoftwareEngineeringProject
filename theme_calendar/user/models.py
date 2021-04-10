from django.db import models

class User(models.Model):
    name            = models.CharField(max_length = 50)
    email		    = models.EmailField(max_length = 200, unique = True)
    password	    = models.CharField(max_length = 200, unique = True) 
    profile_img_url = models.URLField(max_length = 2000, null = True)
    created_at      = models.DateTimeField(auto_now_add = True, null = True)

    class Meta:
        db_table = 'users'
