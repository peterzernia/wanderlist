from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import filters
from .serializers import CountrySerializer
from .models import Country


class CountryListView(ListAPIView):
    queryset = Country.objects.all().order_by('pk')
    serializer_class = CountrySerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'demonym',)
