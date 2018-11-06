from django.db import models
from django.contrib.auth.models import AbstractUser
from countries.models import Country


class User(AbstractUser):
    countries = models.ManyToManyField(
        Country, blank=True, related_name='countries_visited'
        )
