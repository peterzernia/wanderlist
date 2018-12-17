from django.test import TestCase
from .models import Currency, Language, RegionalBloc, Country


class CurrencyTest(TestCase):
    def test_str(self):
        currency = Currency(
            code='USD', name='United States dollar', symbol='US$'
        )
        self.assertEqual(currency.__str__(), 'United States dollar')


class LanguageTest(TestCase):
    def test_str(self):
        language = Language(
            iso639_1='en', name='english', native_name='english'
        )
        self.assertEqual(language.__str__(), 'english')


class RegionalBlocTest(TestCase):
    def test_str(self):
        regional_bloc = RegionalBloc(
            acronym='NAFTA', name='North American Free Trade Agreement',
            other_names=["Tratado de Libre Comercio de Am\u00e9rica del Norte",
                         "Accord de Libre-\u00e9change Nord-Am\u00e9ricain"]
        )
        self.assertEqual(regional_bloc.__str__(), 'NAFTA')


class CountryTest(TestCase):
    def test_str(self):
        country = Country(
            name='United States of America', top_level_domain=[".us"],
            alpha2code='US', alpha3code='USA', calling_codes=["1"],
            capital='Washington, D.C.',
            alt_spellings=["US", "USA", "United States of America"],
            region='Americas', subregion='Northern America',
            population=323947000, latlng=[38.0, -97.0], demonym='American',
            area=9629091, gini=48, timezones=[
                "UTC-12:00", "UTC-11:00",
                "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00",
                "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC+10:00",
                "UTC+12:00"],
            borders=["CAN", "MEX"], native_name='United States',
            numeric_code=840, flag='https://restcountries.eu/data/usa.svg',
            cioc='USA'
        )
        self.assertEqual(country.__str__(), 'United States of America')
