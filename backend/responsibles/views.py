from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.decorators import action
from django.http import Http404
from core.permissions import IsSchoolStaff, IsResponsibleSelf
from core.utils import sendmail_welcome
from . import models, serializers


class ResponsibleViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsSchoolStaff()]
        if self.action == 'update_my_data':
            return [permissions.IsAuthenticated(), IsResponsibleSelf()]
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated(), IsSchoolStaff()]
        return super().get_permissions()

    def get_object(self):
        try:
            return super().get_object()
        except Http404:
            raise NotFound('Responsável não encontrado.')

    def get_queryset(self):
        user = self.request.user
        qs = models.Responsible.objects.select_related('user', 'address')

        if user.is_superuser or user.usertype in ['admin', 'secretary', 'coordinator']:
            return qs

        if user.usertype == 'responsible':
            return qs.filter(user=user)

        return qs.none()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return serializers.ResponsibleWriteSerializer
        return serializers.ResponsibleSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        responsible = serializer.save()

        sendmail_welcome(responsible.user)

        read_serializer = serializers.ResponsibleSerializer(responsible)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        responsible = self.get_object()
        responsible.user.is_active = False
        responsible.user.save()
        return Response({'detail': 'Responsável foi desativado com sucesso.'})

    @action(detail=False, methods=['patch'], url_path='my')
    def update_my_data(self, request):
        responsible = models.Responsible.objects.filter(user=request.user).first()
        if not responsible:
            return Response({'detail': 'Perfil do responsável não encontrado.'}, status=404)

        serializer = serializers.ResponsibleWriteSerializer(responsible, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializers.ResponsibleSerializer(responsible).data)
