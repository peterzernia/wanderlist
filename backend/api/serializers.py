from rest_framework import serializers
from .models import Country, Currency, Language, RegionalBloc


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
    corresponding models. 
    '''
    currencies = CurrenciesSerializer(many=True)
    languages = LanguagesSerializer(many=True)
    regional_blocs = RegionalBlocsSerializer(many=True)
    class Meta:
        model = Country
        fields =('name', 'top_level_domain', 'alpha2code', 'alpha3code',
                 'calling_codes','capital', 'alt_spellings', 'region',
                 'subregion', 'population', 'latlng','demonym', 'area', 'gini',
                 'timezones', 'borders', 'native_name', 'numeric_code',
                 'currencies', 'languages', 'flag',
                 'regional_blocs', 'cioc')
