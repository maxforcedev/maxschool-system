from rest_framework import generics
from . import serializers, models


class StudentCreateView(generics.ListCreateAPIView):
    model = models.Student
    serializer_class = serializers.StudentWriteSerializer
    queryset = models.Student.objects.all()
