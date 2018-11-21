from django.test import TestCase
from users.models import User
from countries.models import Country
from api.serializers import UserDetailSerializer


class UserDetailSerializerTest(TestCase):
    def setUp(self):
        # Create 2 country objects to use later.
        self.country_one = Country.objects.create(
            name="Bouvet Island",
            top_level_domain=[
              ".bv"
            ],
            alpha2code="BV",
            alpha3code="BVT",
            calling_codes=[
              ""
            ],
            capital=None,
            alt_spellings=[
              "BV",
              "Bouvet\u00f8ya",
              "Bouvet-\u00f8ya"
            ],
            region=None,
            subregion=None,
            population=0,
            latlng=[
              -54.43333333,
              3.4
            ],
            demonym=None,
            area=49.0,
            gini=None,
            timezones=[
              "UTC+01:00"
            ],
            borders=[],
            native_name="Bouvet\u00f8ya",
            numeric_code="074",
            flag="https://restcountries.eu/data/bvt.svg",
            cioc=None,
        )
        self.country_two = Country.objects.create(
            name="Congo (Democratic Republic of the)",
            top_level_domain=[
              ".cd"
            ],
            alpha2code="CD",
            alpha3code="COD",
            calling_codes=[
              "243"
            ],
            capital="Kinshasa",
            alt_spellings=[
              "CD",
              "DR Congo",
              "Congo-Kinshasa",
              "DRC"
            ],
            region="Africa",
            subregion="Middle Africa",
            population=85026000,
            latlng=[
              0.0,
              25.0
            ],
            demonym="Congolese",
            area=2344858.0,
            gini=None,
            timezones=[
              "UTC+01:00",
              "UTC+02:00"
            ],
            borders=[
              "AGO",
              "BDI",
              "CAF",
              "COG",
              "RWA",
              "SSD",
              "TZA",
              "UGA",
              "ZMB"
            ],
            native_name="R\u00e9publique d\u00e9mocratique du Congo",
            numeric_code="180",
            flag="https://restcountries.eu/data/cod.svg",
            cioc="COD",
        )
        self.user = User.objects.create(
            username='TestUser',
            email='test@test.com',
            home=self.country_one,
            biography='Hello World!'
        )

    # Testing the custom update() method in the UserDetailSerializer.
    def test_serializer_update(self):
        serializer = UserDetailSerializer()
        data = {
            'username': 'Test',
            'email': 'new_email@test.com',
            'countries': (self.country_one, self.country_two),
            'home': self.country_two,
            'biography': 'Hi World!'
        }
        serializer.update(self.user, data)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'Test')
        self.assertEqual(self.user.email, 'new_email@test.com')
        self.assertEqual(list(self.user.countries.all()), [self.country_one, self.country_two])
        self.assertEqual(self.user.home, self.country_two)
        self.assertEqual(self.user.biography, 'Hi World!')
