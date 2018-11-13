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


class TripReportSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    class Meta:
        model = TripReport
        fields = ('__all__')


class UserDetailSerializer(UserDetailsSerializer):
    '''
    Custom serializer for the /rest-auth/user/ User Details Serializer.
    '''
    countries = CountrySerializer(many=True)
    home = serializers.SlugRelatedField(slug_field='pk', queryset=Country.objects.all())

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'countries', 'home',)

    '''
    Updates the users object in the database. The username, email, countries(a
    list of country objects) and home (country object), are set by a PUT
    request from the frontend.
    '''
    def update(self, instance, validated_data):
        country_names = [cdata['name'] for cdata in validated_data['countries']]
        countries = Country.objects.filter(name__in=country_names)
        instance.username = validated_data['username']
        instance.email = validated_data['email']
        instance.countries.set(countries)
        instance.home = validated_data['home']
        instance.save()
        return instance
