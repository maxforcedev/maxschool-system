
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.utils import timezone


def sendmail_welcome(user):
    subject = "Seja bem vindo - Sistema Escolar"
    html_content = render_to_string("emails/send_welcome.html", {
        "registration_date": timezone.now(),
        "user_name": user.name,
        "user_email": user.email,
        "user_role": user.user_type,
        "site_url": "https://localhost:3000/",
        "login_url": "https://localhost:3000/login",
        "support_url": "https://localhost:3000/",
        "contact_url": "https://localhost:3000/",
    })

    text_content = f"Bem-vindo, {user.name}. Acesse https://localhost:3000/ para entrar no sistema."
    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[user.email]
    )
    email.attach_alternative(html_content, "text/html")
    try:
        email.send()
    except Exception as e:
        print(f"Erro ao enviar e-mail de boas-vindas: {e}")
