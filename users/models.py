from django.db import models
from django.contrib.auth.models import AbstractUser
from countries.models import Country


class User(AbstractUser):
    '''
    Custom User model. Countries is a list of countries associated with the
    user. Home country is a single country object
    '''
    countries = models.ManyToManyField(Country,
        blank=True, related_name='user_countries')
    home = models.ForeignKey(Country, on_delete=models.PROTECT, null=True,
        related_name='home_country',)
    biography = models.CharField(max_length=150, null=True, blank=True)
