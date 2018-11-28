from rest_framework import serializers
from countries.models import Country, Currency, Language, RegionalBloc
from users.models import User
from trips.models import TripReport
from rest_auth.serializers import UserDetailsSerializer
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from collections import OrderedDict


class CurrenciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('code', 'name', 'symbol')


class LanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('iso639_1', 'name', 'native_name')


class RegionalBlocsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionalBloc
        fields = ('acronym', 'name', 'other_acronyms', 'other_names')


class CountryRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('pk',)


class CountrySerializer(serializers.ModelSerializer):
    '''
    The currencies, languages, and regional_bloc fields are made up of the
    corresponding models. In the API, their data will also be available. This
    serializer is used on the Country API View.
    '''
    currencies = CurrenciesSerializer(many=True)
    languages = LanguagesSerializer(many=True)
    regional_blocs = RegionalBlocsSerializer(many=True)

    class Meta:
        model = Country
        fields =('__all__')


class CountryField(serializers.PrimaryKeyRelatedField):
    '''
    This serializer allows GET requests to return the full nested Country
    object, but use the pk for POST/PUT/PATCH requests. This serializer is used
    with the Trip Report and User Detail serializers to simplify handling
    requests from the frontend. This serializer is used on the User & Trip
    Report Views. This makes POST & PUT requests from the frontend easy to
    maintain, e.g. the pk can be stored as the value of an option on a select
    form, instead of having to store the entire country object.
    '''
    def to_representation(self, value):
        pk = super(CountryField, self).to_representation(value)
        try:
            item = Country.objects.get(pk=pk)
            serializer = CountrySerializer(item)
            return serializer.data
        except Country.DoesNotExist:
            return None

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            return {}

        return OrderedDict([(item.id, str(item)) for item in queryset])


class AuthorField(serializers.PrimaryKeyRelatedField):
    '''
    Same as the Country Field serializer, GET requests return User object, but
    POST/PUT/PATCH requests only require the pk of the user.
    '''
    def to_representation(self, value):
        pk = super(AuthorField, self).to_representation(value)
        try:
            item = User.objects.get(pk=pk)
            serializer = UserDetailSerializer(item)
            return serializer.data
        except User.DoesNotExist:
            return None

    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            return {}

        return OrderedDict([(item.id, str(item)) for item in queryset])


class UserSerializer(serializers.ModelSerializer):
    '''
    This is a serializer used to list all of the Users. Users will be filtered
    in the View, and the frontend can make GET requests to view user profiles.
    '''
    countries = CountryField(queryset=Country.objects.all(), many=True)
    home = CountryField(queryset=Country.objects.all())

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'countries', 'home', 'biography')


class TripReportSerializer(serializers.ModelSerializer):
    author = AuthorField(queryset=User.objects.all())
    countries = CountryField(queryset=Country.objects.all(), many=True)
    favoriters = serializers.PrimaryKeyRelatedField(required=False, queryset=User.objects.all(), many=True)
    image = serializers.ImageField(max_length=None, use_url=True, required=False)

    class Meta:
        model = TripReport
        fields = ('__all__')


class UserDetailSerializer(UserDetailsSerializer):
    '''
    Custom serializer for the /rest-auth/user/ User Details Serializer.
    '''
    countries = CountryField(queryset=Country.objects.all(), many=True)
    home = CountryField(queryset=Country.objects.all())

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'countries', 'home', 'biography')

    '''
    Updates the users object in the database. The username, email, countries,
    and home are set by a PUT request from the frontend.
    '''
    def update(self, instance, validated_data):
        instance.username = validated_data['username']
        instance.email = validated_data['email']
        # Direct assignment of ManyToMany objects prohibited, use .set()
        instance.countries.set(validated_data['countries'])
        instance.home = validated_data['home']
        instance.biography = validated_data['biography']
        instance.save()
        return instance


class RegistrationSerializer(RegisterSerializer):
    '''
    Custom Registration Serializer used to include home country field.
    '''
    username = serializers.CharField(required=True, write_only=True)
    email = serializers.EmailField(required=True, write_only=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)
    home = CountryField(queryset=Country.objects.all(),required=True, write_only=True)

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'home': self.validated_data.get('home', ''),
        }

    # As per the Allauth documents, Registration Serializer must include save
    # function that returns user instance.
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.home = self.cleaned_data.get('home')
        user.save()
        return user
