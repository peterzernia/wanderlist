from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)

# Custom fields shown on the admin page.
UserAdmin.fieldsets += ('Custom fields set',
    {'fields': ('countries', 'home' )}),
