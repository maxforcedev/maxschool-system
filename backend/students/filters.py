import django_filters
from .models import Student
from core import choices

class StudentFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='user__name', lookup_expr='icontains')
    classroom_id = django_filters.UUIDFilter(field_name='classroom__id')
    status = django_filters.ChoiceFilter(choices=choices.StudentStatus.choices)
    gender = django_filters.ChoiceFilter(choices=choices.Gender.choices)

    class Meta:
        model = Student
        fields = ['name', 'classroom_id', 'status', 'gender']
