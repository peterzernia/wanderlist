import os
import sys
from io import BytesIO
from PIL import Image
from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.core.files.uploadedfile import InMemoryUploadedFile
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
    image = models.ImageField(upload_to='trip-report', null=True)
    date_posted = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(max_length=12, unique=True, blank=True)
    favoriters = models.ManyToManyField(User, related_name='favoriters')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        '''
        Save assigns a random slug to the post, checks exif information for
        cellphone photos to see what orientation the photo was taken in, then
        rotates the image to be upright. images are reduced to a width of
        600px, with proportionally reduced height to save room on the server.
        '''
        if not self.slug:
            self.slug = get_random_string(
                12,
                '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            )

        if self.image:
            img = Image.open(self.image)
            exif = img._getexif()
            orientation_key = 274
            if exif and orientation_key in exif:
                orientation = exif[orientation_key]

                rotate_values = {
                    3: Image.ROTATE_180,
                    6: Image.ROTATE_270,
                    8: Image.ROTATE_90
                }

                if orientation in rotate_values:
                    img = img.transpose(rotate_values[orientation])

            output = BytesIO()
            output_size = (600, (img.height / img.width) * 600)
            img.thumbnail(output_size)
            img.save(output, format='JPEG', quality=90)
            output.seek(0)
            self.image = InMemoryUploadedFile(
                output, 'ImageField', "%s.jpg" % self.image.name.split('.')[0],
                'image/jpeg', sys.getsizeof(output), None
            )
        super().save(*args, **kwargs)
