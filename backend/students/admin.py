from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'gender', 'birth_date', 'classroom', 'enrollment_date')
    list_filter = ('status', 'gender', 'classroom')
    search_fields = ('user__name', 'user__email', 'user__cpf')
    autocomplete_fields = ('user', 'classroom', 'responsibles')
    readonly_fields = ('enrollment_date',)
