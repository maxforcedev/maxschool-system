from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from django.http import Http404

from . import serializers, models, filters
from classes.models import Classroom
from core.permissions import IsSchoolStaff, IsStudentSelf
from core.utils import sendmail_welcome


class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.StudentFilter, OrderingFilter]
    ordering_fields = ['user__name', 'birth_date', 'enrollment_date']
    ordering = ['user__name']  # padrão

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsSchoolStaff()]
        if self.action == 'update_my_data':
            return [IsAuthenticated(), IsStudentSelf()]
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated(), IsSchoolStaff()]
        return super().get_permissions()

    def get_object(self):
        try:
            return super().get_object()
        except Http404:
            raise NotFound(detail='Aluno não encontrado.')

    def get_queryset(self):
        user = self.request.user
        qs = models.Student.objects.select_related('user', 'classroom')

        if user.is_superuser or user.usertype in ['admin', 'director', 'coordinator', 'secretary']:
            return qs

        elif user.usertype == 'teacher':
            classroom = Classroom.objects.filter(teacher_responsible=user)
            return qs.filter(classroom__in=classroom)

        elif user.usertype == 'student':
            return qs.filter(user=user)

        return models.Student.objects.none()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return serializers.StudentWriteSerializer
        return serializers.StudentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = serializer.save()

        sendmail_welcome(student.user)

        read_serializer = serializers.StudentSerializer(student)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        student = self.get_object()
        student.status = 'inactive'
        student.save()
        return Response({'detail': 'Aluno foi desativado com sucesso.'}, status=200)

    @action(detail=False, methods=['patch'], url_path='my')
    def update_my_data(self, request):
        student = models.Student.objects.filter(user=request.user).first()
        if not student:
            return Response({'detail': 'Perfil do aluno não encontrado.'}, status=404)

        serializer = serializers.StudentWriteSerializer(student, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializers.StudentSerializer(student).data)
