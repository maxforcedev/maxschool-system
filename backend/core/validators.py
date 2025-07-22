import re
from django.core.exceptions import ValidationError


def validate_cpf(value):
    cpf = re.sub(r'\D', '', value)

    if len(cpf) != 11 or cpf == cpf[0] * 11:
        raise ValidationError('O CPF digitado está incorreto.')

    for i in range(9, 11):
        soma = sum(int(cpf[num]) * ((i + 1) - num) for num in range(i))
        digit = ((soma * 10) % 11) % 10
        if digit != int(cpf[i]):
            raise ValidationError('O CPF digitado está incorreto.')


def validate_phone(value):
    phone = re.sub(r'\D', '', value)

    if not phone.isdigit() or len(phone) != 11:
        raise ValidationError('O telefone digitado está incorreto.')
