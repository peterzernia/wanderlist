from rest_framework import serializers
from .models import Country, Currency, Language, RegionalBloc


class CurrenciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('code', 'name', 'symbol')


class LanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ('iso639_1', 'name', 'nativeName')


class RegionalBlocsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionalBloc
        fields = ('acronym', 'name', 'otherAcronyms', 'otherNames')


class CountrySerializer(serializers.ModelSerializer):
    currencies = CurrenciesSerializer(many=True)
    languages = LanguagesSerializer(many=True)
    regionalBlocs = RegionalBlocsSerializer(many=True)
    class Meta:
        model = Country
        fields =('name', 'topLevelDomain', 'alpha2Code', 'alpha3Code',
                 'callingCodes','capital', 'altSpellings', 'region',
                 'subregion', 'population', 'latlng','demonym', 'area', 'gini',
                 'timezones', 'borders', 'nativeName', 'numericCode',
                 'currencies', 'languages', 'flag',
                 'regionalBlocs', 'cioc')
