from rest_framework import serializers
from .models import Student
from core.models.model_address import Address
from core.models.serializers_address import AddressSerializer
from accounts.serializers import UserReadSerializer, UserWriteSerializer
from responsibles.serializers import ResponsibleWriteSerializer
from classes.serializers import ClassroomSerializer


class StudentSerializer(serializers.ModelSerializer):
    from responsibles.serializers import ResponsibleSerializer
    address = AddressSerializer(source='user.address', read_only=True)
    user = UserReadSerializer(read_only=True)
    classroom = ClassroomSerializer(read_only=True)
    responsibles = ResponsibleSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = [
            'id',
            'user',
            'gender',
            'birth_date',
            'status',
            'classroom',
            'address',
            'responsibles'
        ]


class StudentWriteSerializer(serializers.ModelSerializer):
    user = UserWriteSerializer()
    address = AddressSerializer()
    responsibles = ResponsibleWriteSerializer(many=True, required=False)

    class Meta:
        model = Student
        fields = [
            'user',
            'gender',
            'birth_date',
            'status',
            'classroom',
            'notes',
            'address',
            'responsibles',
        ]

    def create(self, validated_data):
        request = self.context.get("request")
        school = getattr(request.user, "school", None)

        user_data = validated_data.pop("user")
        birth_date = validated_data.get("birth_date")
        responsibles_data = validated_data.pop("responsibles", [])
        address_data = validated_data.pop("address")

        if birth_date:
            raw_password = birth_date.strftime("%d%m%Y")
            user_data["password"] = raw_password
        else:
            user_data["password"] = user_data['password']

        user_data["user_type"] = "student"

        user_serializer = UserWriteSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        user.raw_password = raw_password

        address = Address.objects.create(user=user, **address_data)
        validated_data.pop("school", None)
        student = Student.objects.create(user=user, address=address, school=school, **validated_data)

        for responsible_data in responsibles_data:
            responsible_serializer = ResponsibleWriteSerializer(
                data=responsible_data, context=self.context
            )
            responsible_serializer.is_valid(raise_exception=True)
            responsible = responsible_serializer.save(school=school)
            student.responsibles.add(responsible)

        return student
