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
    class Meta:
        model = TripReport
        fields = ('__all__')


class UserDetailSerializer(UserDetailsSerializer):
    '''
    Custom serializer for the /rest-auth/user/ User Details Serializer.
    '''
    countries = CountrySerializer(many=True)

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'countries',)

    '''
    Updates the users country list with a put request from the frontend by
    making a list of all of the names of the countries in the validated_data,
    then building a queryset from the list of names.
    '''
    def update(self, instance, validated_data):
        country_names = [cdata['name'] for cdata in validated_data['countries']]
        countries = Country.objects.filter(name__in=country_names)
        instance.countries.set(countries)
        return instance
