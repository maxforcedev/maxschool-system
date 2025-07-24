from django.db import models
from core.models import Address
import uuid


class School(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=18, unique=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name="schools")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class BaseModel(models.Model):
    school = models.ForeignKey("schools.School", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
