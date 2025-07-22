from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from . import serializers, models, utils
from classes.models import Classroom


class StudentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser or user.usertype in ['admin', 'director', 'coordinator', 'secretary']:
            return models.Student.objects.all()

        elif user.usertype == 'teacher':
            classroom = Classroom.objects.filter(teacher_responsible=user)
            return models.Student.objects.filter(classroom__in=classroom)

        elif user.usertype == 'student':
            return models.Student.objects.filter(user=user)

        return models.Student.objects.none()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return serializers.StudentWriteSerializer
        return serializers.StudentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = serializer.save()

        utils.sendmail_welcome(student.user)

        read_serializer = serializers.StudentSerializer(student)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['patch'], url_path='my')
    def update_my_data(self, request):
        student = models.Student.objects.filter(user=request.user).first()
        if not student:
            return Response({'detail': 'Perfil do aluno não encontrado.'}, status=404)

        serializer = serializers.StudentWriteSerializer(student, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializers.StudentSerializer(student).data)
