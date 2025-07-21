from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializers, utils


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


def create_token_reset(user):

    def post(self, request):
        token = utils.generate_token(45)
        