import django_filters
from core import choices
from .models import Responsible


class ResponsibleFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='user__name', lookup_expr='icontains')
    relationship = django_filters.ChoiceFilter(choices=choices.RelationshipType.choices)

    class Meta:
        model = Responsible
        fields = ['name', 'relationship']
