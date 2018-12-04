from django.test import TestCase
from trips.models import TripReport
from users.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from backend.settings import *
from api.serializers import TripReportSerializer
from PIL import Image
import requests
from io import BytesIO


class TripReportTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="TestUser")
        img = '/Users/peterzernia/projects/countries/test_image.jpg'
        # Create the Trip Report with a test image.
        with open(img, 'rb') as infile:
            self.trip_report = TripReport.objects.create(
                title='Test',
                author=self.user,
                image=infile
            )

    def test_str(self):
        self.assertEqual(self.trip_report.__str__(), 'Test')

    # Test a slug was created for the Trip Report.
    def test_slug(self):
        self.assertTrue(self.trip_report.slug)

    # Tests if image was uploaded to S3. Note: this test will fail if an image
    # named 'test_image.jpg' exists until a test bucket is added.
    def test_image_upload_to_s3(self):
        response = requests.get(f"{MEDIA_URL}trip-report/test_image.jpg")
        serializer = TripReportSerializer(self.trip_report)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(serializer.data['image'], f"{MEDIA_URL}trip-report/test_image.jpg")

    # Verify that the uploaded image has been reduced to 600 pixels wide.
    def test_image_size(self):
        response = requests.get(f"{MEDIA_URL}trip-report/test_image.jpg")
        img = Image.open(BytesIO(response.content))
        self.assertEqual(img.size[0], 600)


    # tearDown also tests the auto_delete_file_on_trip_report_delete. An GET
    # request to the s3 server where the image does not exist returns code 403
    # forbidden.
    def tearDown(self):
        self.trip_report.delete()
        response = requests.get(f"{MEDIA_URL}trip-report/test_image.jpg")
        self.assertEqual(response.status_code, 403)
