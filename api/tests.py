from django.test import TestCase
from users.models import User
from countries.models import Country
from trips.models import TripReport
from api.serializers import (
    UserDetailSerializer, RegistrationSerializer, AuthorField, CountryField
)
from api.views import FavoriteAPI
from django.urls import reverse
from rest_framework.test import force_authenticate, APIRequestFactory, APIClient
from django.contrib.sessions.middleware import SessionMiddleware
from rest_framework.authtoken.models import Token
from rest_auth.views import UserDetailsView
from collections import OrderedDict


class UserDetailSerializerTest(TestCase):
    def setUp(self):
        # Create two country objects.
        self.country_one = Country.objects.create(name="Bouvet Island")
        self.country_two = Country.objects.create(
            name="Congo (Democratic Republic of the)"
        )
        # Create a user object.
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
        # After updating, the object should have the new values.
        serializer.update(self.user, data)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'Test')
        self.assertEqual(self.user.email, 'new_email@test.com')
        self.assertEqual(
            list(self.user.countries.all().order_by('pk')),
            [self.country_one, self.country_two]
        )
        self.assertEqual(self.user.home, self.country_two)
        self.assertEqual(self.user.biography, 'Hi World!')

    # Test that PUT request uses countries/home pk and not the entire object.
    def test_put_request(self):
        factory = APIRequestFactory()
        view = UserDetailsView.as_view()
        token, created = Token.objects.get_or_create(user=self.user)
        data = {
            'username': 'Test',
            'email': 'new_email@test.com',
            'countries': (self.country_one.pk, self.country_two.pk), # Pk not object
            'home': self.country_two.pk, # Pk not object
            'biography': 'Hi World!'
        }
        url = reverse('rest_user_details')
        request = factory.put('/api/v1/rest-auth/user/', data)
        force_authenticate(request, user=self.user, token=self.user.auth_token)
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'Test')
        self.assertEqual(self.user.email, 'new_email@test.com')
        self.assertEqual(self.user.countries.all().count(), 2)
        self.assertEqual(self.user.home, self.country_two)

        # When the data is POSTed with full objects instead of just their pk,
        # it returns 400 bad request.
        data = {
            'username': 'Test',
            'email': 'new_email@test.com',
            'countries': (self.country_one, self.country_two),
            'home': self.country_one,
            'biography': 'Hi World!'
        }
        url = reverse('rest_user_details')
        request = factory.put(url, data)
        force_authenticate(request, user=self.user, token=self.user.auth_token)
        response = view(request)
        self.assertEqual(response.status_code, 400)

        # Country with pk=3 does not exist.
        data = {
            'username': 'Test',
            'email': 'new_email@test.com',
            'countries': (1, 2, 3),
            'home': 3,
            'biography': 'Hi World!'
        }
        url = reverse('rest_user_details')
        request = factory.put(url, data)
        force_authenticate(request, user=self.user, token=self.user.auth_token)
        response = view(request)
        self.assertEqual(response.status_code, 400)


class TestTripReportViewSet(TestCase):
    def setUp(self):
        # Create two country objects.
        self.country_one = Country.objects.create(name="Bouvet Island")
        self.country_two = Country.objects.create(
            name="Congo (Democratic Republic of the)"
        )
        # Create a user object.
        self.user = User.objects.create(
            username='TestUser',
            email='test@test.com',
            home=self.country_one,
            biography='Hello World!'
        )

    # Test that Trip Reports can be POSTed with just the User & Country pks.
    def test_post_and_put_request(self):
        client = APIClient()
        client.force_authenticate(user=self.user)
        data = {
            'title': 'Test',
            'content': 'Test Content',
            'countries': (self.country_one.pk,), # Pk not object
            'author': self.user.pk, # Pk not object
        }
        response = client.post('/api/v1/reports/', data)
        self.assertEqual(response.status_code, 201)


        # POSTing with object instead of pk returns 400 bad response.
        data = {
            'title': 'Test',
            'content': 'Test Content',
            'countries': (self.country_one, self.country_two),
            'author': self.user,
        }
        response = client.post('/api/v1/reports/', data)
        self.assertEqual(response.status_code, 400)


        # Test that Trip Reports can be updated with just User & Country pks
        client = APIClient()
        client.force_authenticate(user=self.user)
        data = {
            'title': 'Test Updated',
            'content': 'Test Content Updated',
            'countries': (self.country_two.pk,), # Pk not object
            'author': self.user.pk, # Pk not object
        }
        report = TripReport.objects.all()[0]
        response = client.put(f'/api/v1/reports/{report.pk}/', data)
        self.assertEqual(response.status_code, 200)
        report = TripReport.objects.all()[0]
        self.assertEqual(report.title, 'Test Updated')
        self.assertEqual(report.content, 'Test Content Updated')
        self.assertEqual(list(report.countries.all()), [self.country_two])


class RegistrationSerializerTest(TestCase):
    def setUp(self):
        self.country = Country.objects.create(name="Bouvet Island")

    def test_save(self):
        factory = APIRequestFactory()
        data = {
            'username': 'TestUser',
            'email': 'test@test.com',
            'password1': 'testing1234',
            'password2': 'testing1234',
            'home': self.country.pk, # Post with pk and not object.
        }
        request = factory.post('/api/v1/rest-auth/registration/', data)

        # Middlemare must be added to run setup_user_email() method.
        middleware = SessionMiddleware()
        middleware.process_request(request)
        request.session.save()

        serializer = RegistrationSerializer(data=data)
        serializer.is_valid()
        self.assertEqual(
            serializer.save(request), User.objects.get(username='TestUser')
        )


class AuthorFieldTest(TestCase):
    def test_get_choices(self):
        serializer = AuthorField(queryset=User.objects.all())
        self.assertEqual(serializer.get_choices(), {})

        self.user = User.objects.create(
            username='TestUser',
            email='test@test.com',
            biography='Hello World!'
        )
        serializer = AuthorField(queryset=User.objects.all())
        self.assertEqual(
            serializer.get_choices(), OrderedDict([(1, 'TestUser')])
        )


class CountryFieldTest(TestCase):
    def test_get_choices(self):
        serializer = CountryField(queryset=Country.objects.all())
        self.assertEqual(serializer.get_choices(), {})

        self.country = Country.objects.create(name="Bouvet Island")
        serializer = CountryField(queryset=Country.objects.all())
        self.assertEqual(
            serializer.get_choices(), OrderedDict([(1, 'Bouvet Island')])
        )


class FavoriteAPITest(TestCase):
    # Test that get request to FavoriteAPI toggles user to list of favoriters.
    def test_get(self):
        self.user = User.objects.create(username='TestUser')
        self.trip_report = TripReport.objects.create(
                               title='Test', content='Test', author=self.user
                           )
        # Test favoriters is currently empty.
        self.assertEqual(self.trip_report.favoriters.all().count(), 0)

        # Test get request was successful and user has been added.
        client = APIClient()
        client.force_authenticate(user=self.user)
        response = client.get(f'/api/v1/reports/{self.trip_report.pk}/favorite/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.trip_report.favoriters.all().count(), 1)

        # Test user has been removed after second get request.
        response = client.get(f'/api/v1/reports/{self.trip_report.pk}/favorite/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.trip_report.favoriters.all().count(), 0)
