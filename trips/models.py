from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string
from users.models import User
from countries.models import Country


class TripReport(models.Model):
    '''
    The model for trip reports. The countries field is a list of countries the
    post references.
    '''
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    countries = models.ManyToManyField(
        Country, blank=False, related_name='trip_countries')
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(max_length=12, unique=True, blank=True)
    favoriters = models.ManyToManyField(User, related_name='favoriters')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = get_random_string(
                12,
                '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            )

        super().save(*args, **kwargs)
