from rest_framework import serializers
from .models import Responsible
from students.serializers import AddressSerializer
from accounts.serializers import UserReadSerializer, UserWriteSerializer
from core.models import Address
from core.utils import sendmail_welcome


class ResponsibleWriteSerializer(serializers.ModelSerializer):
    user = UserWriteSerializer()
    address = AddressSerializer()

    class Meta:
        model = Responsible
        fields = ['user', 'address', 'relationship', 'notes']

    def create(self, validated_data):
        school = self.context["request"].user.school
        user_data = validated_data.pop("user")
        user_data["user_type"] = "responsible"
        raw_password = user_data["password"] = user_data["cpf"]

        user_serializer = UserWriteSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        user.raw_password = raw_password

        address_data = validated_data.pop("address", None)
        if address_data:
            address = Address.objects.create(user=user, **address_data)
        else:
            raise serializers.ValidationError("Endereço do responsável é obrigatório.")

        sendmail_welcome(user)
        validated_data.pop("school", None)

        responsible = Responsible.objects.create(
            user=user,
            address=address,
            school=school,
            **validated_data
        )

        return responsible


class ResponsibleSerializer(serializers.ModelSerializer):
    user = UserReadSerializer()
    address = AddressSerializer()

    class Meta:
        model = Responsible
        fields = ['user', 'address', 'relationship', 'notes']
