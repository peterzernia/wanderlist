import os
from django.db import models
from users.models import User
from countries.models import Country
from django.utils import timezone
from django.utils.crypto import get_random_string


def get_image_path(instance, filename):
    return os.path.join('trip-reports', str(instance.author), filename)


class TripReport(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    countries = models.ManyToManyField(Country, blank=False, related_name='trip_countries')
    title = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to=get_image_path, null=True, blank=False)
    date_posted = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(max_length=12, unique=True, blank=True)
    favoriters = models.ManyToManyField(User, related_name='favoriters')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = get_random_string(12,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
        super().save(*args, **kwargs)
