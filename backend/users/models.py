from django.db import models
from django.contrib.auth.models import AbstractUser
from countries.models import Country


class User(AbstractUser):
    countries = models.ManyToManyField(Country, blank=True)
    count = models.IntegerField(blank=True, default=0)

    def save(self, *args, **kwargs):
        # Must save model before Many To Many relationship can be used.
        super(User, self).save(*args, **kwargs)
        self.count = self.countries.count()
        super(User, self).save(*args, **kwargs)
