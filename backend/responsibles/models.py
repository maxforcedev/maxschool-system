from django.db import models
from accounts.models import User
from core import choices
from core.models import Address


class Responsible(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    relationship = models.CharField(max_length=20, choices=choices.RelationshipType.choices)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.name} ({self.get_relationship_display()})"
