from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework import viewsets, filters
from .serializers import CountrySerializer, TripReportSerializer
from countries.models import Country
from trips.models import TripReport


class CountryListView(ListAPIView):
    '''
    This is the api view for all of the countries and territories represented in
    the Country model. This model can be filtered with search, using the fields
    listed in search_fields.
    '''
    queryset = Country.objects.all().order_by('name')
    serializer_class = CountrySerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'demonym', 'alpha3code', 'languages__name')


class TripReportViewSet(viewsets.ModelViewSet):
    serializer_class = TripReportSerializer
    queryset = TripReport.objects.all().order_by('-pk')
    filter_backends = (filters.SearchFilter,)
    search_fields = ('author__username',)
