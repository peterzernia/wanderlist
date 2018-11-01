from django.db import models
from django.contrib.postgres.fields import JSONField


class Currency(models.Model):
    '''
    Describes currencies used by countrties around the world.
    '''
    code = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    symbol = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class Language(models.Model):
    '''
    Describes official languages recognized by countries or other jurisdictions.
    '''
    iso639_1 = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    native_name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name


class RegionalBloc(models.Model):
    '''
    Describes the trade blocs made of the countries of the world.
    '''
    acronym = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    other_acronyms = JSONField(null=True, blank=True)
    other_names = JSONField(null=True, blank=True)

    def __str__(self):
        return self.acronym

class Country(models.Model):
    '''
    Describes the countries, as well as territories of the world.
    '''
    name = models.CharField(max_length=255, null=True, blank=True)
    top_level_domain = JSONField(null=True, blank=True)
    alpha2code = models.CharField(max_length=255, null=True, blank=True)
    alpha3code = models.CharField(max_length=255, null=True, blank=True)
    calling_codes = JSONField(null=True, blank=True)
    capital = models.CharField(max_length=255, null=True, blank=True)
    alt_spellings = JSONField(null=True, blank=True)
    region = models.CharField(max_length=255, null=True, blank=True)
    subregion = models.CharField(max_length=255, null=True, blank=True)
    population = models.IntegerField(null=True, blank=True)
    latlng = JSONField(null=True, blank=True)
    demonym = models.CharField(max_length=255, null=True, blank=True)
    area = models.FloatField(null=True, blank=True)
    gini = models.FloatField(null=True, blank=True)
    timezones = JSONField(null=True, blank=True)
    borders = JSONField(null=True, blank=True)
    native_name = models.CharField(max_length=255, null=True, blank=True)
    numeric_code= models.CharField(max_length=255, null=True, blank=True)
    currencies = models.ManyToManyField(Currency)
    languages = models.ManyToManyField(Language)
    flag = models.CharField(max_length=255, null=True, blank=True)
    regional_blocs = models.ManyToManyField(RegionalBloc, blank=True)
    cioc = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name
