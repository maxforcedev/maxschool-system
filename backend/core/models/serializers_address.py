from rest_framework import serializers
from .model_address import Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['zip_code', 'street', 'number', 'neighborhood', 'city', 'state', 'reference']
