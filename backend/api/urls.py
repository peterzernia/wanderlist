from django.urls import path
from .views import CountryListView

urlpatterns = [
    path('countries/', CountryListView.as_view()),
]
