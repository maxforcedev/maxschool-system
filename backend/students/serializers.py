from rest_framework import serializers
from .models import Student
from accounts.models import User
from classes.models import Classroom
from core.models.model_address import Address
from core import validators


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['zip_code', 'street', 'number', 'neighborhood', 'city', 'state', 'reference']


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['id', 'name', 'year', 'period']


class UserReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'cpf', 'phone', 'user_type']


class UserWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = fields = ['name', 'email', 'cpf', 'phone', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_cpf(self, value):
        cpf = ''.join(filter(str.isdigit, value))

        if cpf and len(cpf) == 11:
            validators.validate_cpf(cpf)
        if User.objects.filter(cpf=cpf).exists():
            raise serializers.ValidationError('O CPF informado ja está cadastrado em nosso sistema.')
        return cpf

    def validate_phone(self, value):
        phone = ''.join(filter(str.isdigit, value))

        if len(phone) not in [10, 11]:
            raise serializers.ValidationError('Telefone deve conter 10 ou 11 dígitos.')
        return phone

    def validate_email(self, value):
        email = value.lower().strip()

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Este e-mail já está em uso.')
        return email

    def create(self, validated_data):
        user = User(
            name=validated_data['name'],
            email=validated_data['email'].lower().strip(),
            user_type=validated_data['user_type', 'student'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class StudentSerializer(serializers.ModelSerializer):
    address = AddressSerializer(source='user.address', read_only=True)
    user = UserReadSerializer(read_only=True)
    classroom = ClassroomSerializer(read_only=True)

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
        ]


class StudentWriteSerializer(serializers.ModelSerializer):
    user = UserWriteSerializer()

    class Meta:
        model = Student
        fields = [
            'user',
            'gender',
            'birth_date',
            'status',
            'classroom',
            'notes',
        ]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data.pop('user_type', None)
        user_data['user_type'] = 'student'
        user_serializer = UserWriteSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        student = Student.objects.create(user=user, **validated_data)
        return student
