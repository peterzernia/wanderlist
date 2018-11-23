from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import viewsets, filters
from .serializers import CountrySerializer, TripReportSerializer, UserSerializer
from countries.models import Country
from trips.models import TripReport
from users.models import User
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count


class TripReportSetPagination(PageNumberPagination):
    '''
    This sets pagination for the Trip Reports api view. No pagination is used
    for the Country API view because the max array size return from a GET
    request will be 250 Country objects, but the Trip Reports API will continue
    to grow.
    '''
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3


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
    queryset = TripReport.objects.all().annotate(count=Count('favoriters')).order_by('-count')
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('=author__username', '=slug')
    ordering_fields = ('pk', )


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('=username', )


class FavoriteAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, slug=None, format=None, pk=None):
        obj = get_object_or_404(TripReport, id=pk)
        user = self.request.user
        favorited = False
        if user.is_authenticated:
            if user in obj.favoriters.all():
                favorited = False
                obj.favoriters.remove(user)
            else:
                favorited = True
                obj.favoriters.add(user)
        data = {
            "favorited": favorited,
        }
        return Response(data)
