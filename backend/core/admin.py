from django.contrib import admin
from core.models import Address


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    search_fields = ['zip_code', 'street', 'neighborhood', 'city', 'state']
    list_display = ['zip_code', 'street', 'city', 'state']
