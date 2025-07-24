import uuid
from django.db import models
from core import choices
from schools.models import BaseModel


class Classroom(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField('Nome da turma: 0ª ANO', max_length=15)
    year = models.PositiveIntegerField('Ano letivo')
    teacher_responsible = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='responsible_classroom')
    room_number = models.CharField('Identificação da sala (opcional)', max_length=50, blank=True, null=True)
    observations = models.TextField('Observações Internas (opcional)', blank=True, null=True)
    period = models.CharField(max_length=20, choices=choices.Period.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
