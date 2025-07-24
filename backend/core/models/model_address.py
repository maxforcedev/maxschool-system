from django.db import models


class Address(models.Model):
    user = models.OneToOneField('accounts.User', on_delete=models.CASCADE)
    zip_code = models.CharField('CEP', max_length=9)
    street = models.CharField('Nome da rua/avenida', max_length=60)
    number = models.CharField('Numero', max_length=10)
    neighborhood = models.CharField('Bairro', max_length=50)
    city = models.CharField('Cidade', max_length=50)
    state = models.CharField('Estado', max_length=50)
    reference = models.CharField('Ponto de referencia', max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
