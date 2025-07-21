from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from . import serializers, utils
User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    POST /api/v1/accounts/register/
    Registro de usuários.
    """
    serializer_class = serializers.RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(APIView):
    """
    GET /api/v1/accounts/me/
    Informação do perfil logado
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = serializers.UserSerializer(request.user)
        return Response(serializer.data)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = serializers.LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgoutPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if email:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'error': 'Se o e-mail estiver correto, você receberá um link'}, status=status.HTTP_200_OK)

            token = utils.create_reset_token(user)
            print(token)
            return Response({'error': 'Se o e-mail estiver correto, você receberá um link'}, status=status.HTTP_200_OK)
        return Response({'error': 'O campo email é obrigatorio.'}, status=status.HTTP_400_BAD_REQUEST)
