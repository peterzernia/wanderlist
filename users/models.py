from django.db import models
from django.contrib.auth.models import AbstractUser
from countries.models import Country


class User(AbstractUser):
    '''
    Custom User model. Countries is a list of countries associated with the
    user.
    '''
    countries = models.ManyToManyField(
        Country, blank=True, related_name='user_countries')
