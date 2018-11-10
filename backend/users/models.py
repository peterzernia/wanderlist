from django.db import models
from django.contrib.auth.models import AbstractUser
from countries.models import Country


class User(AbstractUser):
    countries = models.ManyToManyField(
        Country, blank=True, related_name='countries_list'
        )
    profile_img = models.CharField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        # Must save model before Many To Many relationship can be used.
        super(User, self).save(*args, **kwargs)
        self.count = self.countries.count()
        super(User, self).save(*args, **kwargs)
