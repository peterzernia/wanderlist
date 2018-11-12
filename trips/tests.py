from django.test import TestCase
from trips.models import TripReport


class TripReportTest(TestCase):
    def test_str(self):
        trip_report = TripReport(
            title='Test'
        )
        self.assertEqual(trip_report.__str__(), trip_report.title)
