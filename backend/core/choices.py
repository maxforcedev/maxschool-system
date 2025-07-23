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


class Gender(models.TextChoices):
    MALE = 'male', 'Masculino'
    FEMALE = 'female', 'Feminino'
    OTHER = 'other', 'Outro'


class StudentStatus(models.TextChoices):
    ACTIVE = 'active', 'Ativo'
    TRANSFERRED = 'transferred', 'Transferido'
    INACTIVE = 'inactive', 'Desligado'
    SUSPENDED = 'suspended', 'Suspenso'


class Period(models.TextChoices):
    MORNING = 'morning', 'Manhã'
    AFTERNOON = 'afternoon', 'Tarde'
    EVENING = 'evening', 'Noite'
    FULL = 'full', 'Integral'


class RelationshipType(models.TextChoices):
    MAE = 'mother', 'Mãe'
    PAI = 'father', 'Pai'
    TUTOR = 'tutor', 'Tutor(a)'
    AVOS = 'avos', 'Avô/Avó'
    IRMAO = 'irmao', 'Irmão(ã)'
    OUTRO = 'outro', 'Outro'
