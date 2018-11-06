from rest_framework import serializers
from countries.models import Country, Currency, Language, RegionalBloc
from users.models import User
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


class UserDetailSerializer(UserDetailsSerializer):
    countries = serializers.SlugRelatedField(
        many=True, slug_field='name', queryset=Country.objects.all()
        )

    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'count', 'countries')
