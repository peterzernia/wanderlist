from django.test import TestCase
from trips.models import TripReport
from users.models import User
from api.serializers import TripReportSerializer


class TripReportTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="TestUser")
        self.trip_report = TripReport.objects.create(
            title='Test',
            author=self.user,
        )

    def test_str(self):
        self.assertEqual(self.trip_report.__str__(), 'Test')

    # Test a slug was created for the Trip Report.
    def test_slug(self):
        self.assertTrue(self.trip_report.slug)
