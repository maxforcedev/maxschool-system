import django_filters
from .models import Student


class StudentFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='user__name', lookup_expr='icontains')
    classroom_id = django_filters.UUIDFilter(field_name='classroom__id')
    status = django_filters.CharFilter(field_name='status')
    gender = django_filters.CharFilter(field_name='gender')

    class Meta:
        model = Student
        fields = ['name', 'classroom_id', 'status', 'gender']
