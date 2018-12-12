import os
from django.dispatch import receiver
from django.db.models.signals import post_delete, pre_save
from trips.models import TripReport

'''
When a Trip Report is deleted, the image file get deleted from file system.
'''
@receiver(post_delete, sender=TripReport)
def auto_delete_file_on_trip_report_delete(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)

'''
When a Trip Report image is updated, the old file gets deleted from file system.
'''
@receiver(pre_save, sender=TripReport)
def auto_delete_old_image_file_on_image_update(sender, instance, **kwargs):
    try:
        old_file = TripReport.objects.get(pk=instance.pk).image
    except TripReport.DoesNotExist:
        return False

    new_file = instance.image
    if new_file != old_file:
        old_file.delete(save=False)
