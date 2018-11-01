from django.test import TestCase
from api.models import Currency, Language, RegionalBloc, Country


class CurrencyTest(TestCase):
    def test_string_representation(self):
        currency = Currency(
            code='USD', name="United States dollar", symbol = "US$")
        self.assertEqual(str(currency), currency.name)
