from django.db import models
from core import choices
from core.models import Address
from schools.models import BaseModel


class Student(BaseModel):
    user = models.OneToOneField('accounts.User', on_delete=models.CASCADE)
    status = models.CharField('Status', max_length=20, choices=choices.StudentStatus.choices, default=choices.StudentStatus.ACTIVE)
    gender = models.CharField('Gênero', choices=choices.Gender.choices, blank=True, null=True)
    birth_date = models.DateField('Data de nascimento')
    enrollment_date = models.DateField('Data de ingresso', auto_now_add=True)
    exit_date = models.DateField('Data de saída', blank=True, null=True)
    notes = models.TextField('Observações internas', blank=True, null=True)
    classroom = models.ForeignKey('classes.Classroom', on_delete=models.SET_NULL, null=True, blank=True, related_name='students')
    responsibles = models.ManyToManyField('responsibles.Responsible', related_name='students')
    address = models.ForeignKey(Address, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.name
