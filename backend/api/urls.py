from django.urls import path, include
from .views import CountryListView

urlpatterns = [
    path('countries/', CountryListView.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
