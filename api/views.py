from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework import viewsets, filters
from .serializers import CountrySerializer, TripReportSerializer, UserSerializer
from countries.models import Country
from trips.models import TripReport
from users.models import User
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination


# Sets pagination only for the Trip Reports. The max return for countries will
# only be 250 objects, but Trip Reports will continue to grow.
class TripReportSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 5


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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = TripReportSerializer
    pagination_class = TripReportSetPagination
    queryset = TripReport.objects.all().order_by('-pk')
    filter_backends = (filters.SearchFilter,)
    search_fields = ('=author__username',)


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('=username', )
