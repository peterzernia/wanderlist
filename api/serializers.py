from rest_framework import serializers
from countries.models import Country, Currency, Language, RegionalBloc
from users.models import User
from trips.models import TripReport
from rest_auth.serializers import UserDetailsSerializer


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


class CountrySerializer(serializers.ModelSerializer):
    '''
    The currencies, languages, and regional_bloc fields are made up of the
    corresponding models. In the API, their data will also be available.
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
    requests from the frontend.
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


class TripReportSerializer(serializers.ModelSerializer):
    author = AuthorField(queryset=User.objects.all())
    countries = CountryField(queryset=Country.objects.all(), many=True)
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
        fields = ('pk', 'username', 'email', 'countries', 'home',)

    '''
    Updates the users object in the database. The username, email, countries,
    and home are set by a PUT request from the frontend.
    '''
    def update(self, instance, validated_data):
        instance.username = validated_data['username']
        instance.email = validated_data['email']
        instance.countries.set(validated_data['countries']) # Direct assignment of ManyToMany objects prohibited, use .set()
        instance.home = validated_data['home']
        instance.save()
        return instance
