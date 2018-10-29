from django.urls import path
from .views import CountryListView

urlpatterns = [
    path('', CountryListView.as_view()),

]
