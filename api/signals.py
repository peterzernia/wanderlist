import os
from django.dispatch import receiver
from django.db.models.signals import post_delete
from trips.models import TripReport


@receiver(post_delete, sender=TripReport)
def auto_delete_file_on_post_delete(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
