
from django.utils import timezone
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from datetime import timedelta
from .models import PasswordResetToken
from core import utils


def create_reset_token(user):
    token = utils.generate_token(45)

    if token and user:
        PasswordResetToken.objects.create(
            user=user,
            token=token,
            expires_at=timezone.now() + timedelta(days=1)
        )
        return token
    return None


def send_reset_email(user, token):
    reset_url = f"https://localhost:3000/reset-password?token={token}"
    subject = "Recuperação de senha - Sistema Escolar"
    html_content = render_to_string("emails/reset_password.html", {
        "reset_link": reset_url,
        "user_name": user.name,
        "user_email": user.email,
        "site_url": "https://localhost:3000/",
        "support_url": "https://localhost:3000/",
        "contact_url": "https://localhost:3000/",
    })

    text_content = f"Acesse este link para resetar sua senha: {reset_url}"

    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[user.email]
    )
    email.attach_alternative(html_content, "text/html")
    email.send()
