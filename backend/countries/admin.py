from django.contrib import admin
from .models import Country, Currency, Language, RegionalBloc


admin.site.register(Country)
admin.site.register(Currency)
admin.site.register(Language)
admin.site.register(RegionalBloc)
