from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.utils import timezone
from . import models


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = models.User
        fields = ['id', 'name', 'email', 'password', 'user_type']
        read_only_fields = ['id']

    def create(self, validated_data):
        request = self.context.get("request")
        school = getattr(request.user, "school", None)

        password = validated_data.pop('password')
        user = models.User(**validated_data, school=school)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)

            if not user:
                raise serializers.ValidationError("As credencias fornecidas são invalidas.")
        else:
            raise serializers.ValidationError("Email e senha são obrigatorios.")

        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user).data
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'name', 'email', 'user_type']


class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    def validate(self, data):
        token = data.get("token")
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if password != confirm_password:
            raise serializers.ValidationError("As senhas não coincidem.")

        try:
            reset_token = models.PasswordResetToken.objects.select_related("user").get(token=token)
        except models.PasswordResetToken.DoesNotExist:
            raise serializers.ValidationError("Token inválido.")

        if reset_token.expires_at < timezone.now():
            raise serializers.ValidationError("Token expirado.")

        data["user"] = reset_token.user
        data["reset_token_obj"] = reset_token
        return data
