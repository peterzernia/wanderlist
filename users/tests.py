from django.test import TestCase
from .models import User


class UserTest(TestCase):
    def test_str(self):
        user = User(username='TestUser')
        self.assertEqual(user.__str__(), 'TestUser')
