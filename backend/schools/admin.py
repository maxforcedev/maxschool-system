from django.contrib import admin
from .models import School


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'cnpj', 'get_city', 'created_at')
    search_fields = ('name', 'cnpj')
    list_filter = ('created_at', 'address__city')
    autocomplete_fields = ('address',)
    ordering = ['name']

    def get_city(self, obj):
        return obj.address.city
    get_city.short_description = "Cidade"
