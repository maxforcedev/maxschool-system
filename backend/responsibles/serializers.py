from rest_framework import serializers
from .models import Responsible
from students.serializers import UserWriteSerializer, AddressSerializer, UserReadSerializer


class ResponsibleWriteSerializer(serializers.ModelSerializer):
    user = UserWriteSerializer()

    class Meta:
        model = Responsible
        fields = ['user', 'address', 'relationship', 'notes']

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_data["user_type"] = "responsible"

        user_serializer = UserWriteSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        responsible = Responsible.objects.create(user=user, **validated_data)
        return responsible


class ResponsibleSerializer(serializers.ModelSerializer):
    user = UserReadSerializer()
    address = AddressSerializer()

    class Meta:
        model = Responsible
        fields = ['user', 'address', 'relationship', 'notes']
