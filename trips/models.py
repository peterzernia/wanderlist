from django.db import models
from users.models import User
from countries.models import Country
from django.utils import timezone


class TripReport(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    countries = models.ManyToManyField(Country, blank=False, related_name='trip_countries')
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateField(default=timezone.now)
    date_updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.title
