from django.db import models


class UserType(models.TextChoices):
    STUDENT = 'student', 'Aluno(a)'
    RESPONSIBLE = 'responsible', 'Responsável'
    ADMIN = 'admin', 'Administrador(a)'
    TEACHER = 'teacher', 'Professor(a)'
    DIRECTOR = 'director', 'Diretor(a)'
    COORDINATOR = 'coordinator', 'Coordenador(a)'
    SECRETARY = 'secretary', 'Secretário(a)'
    STAFF = 'staff', 'Funcionário(a)'
