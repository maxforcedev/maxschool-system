from django.contrib import admin
from .models import Responsible


@admin.register(Responsible)
class ResponsibleAdmin(admin.ModelAdmin):
    list_display = ('user', 'relationship')
    list_filter = ('relationship',)
    search_fields = ('user__name', 'user__email', 'user__cpf')
    autocomplete_fields = ('user', 'address')
