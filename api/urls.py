from django.urls import path, include
from .views import CountryListView, TripReportViewSet, UserListView
from rest_framework.routers import DefaultRouter
from .views import FavoriteAPI

router = DefaultRouter()
router.register(r'reports', TripReportViewSet, base_name='trip_report')

urlpatterns = [
    path('countries/', CountryListView.as_view()),
    path('users/', UserListView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('reports/<int:pk>/favorite/', FavoriteAPI.as_view()),
]

urlpatterns += router.urls
