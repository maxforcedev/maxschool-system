
# 🏫 MaxSchool - Sistema Escolar Web

MaxSchool é um sistema escolar moderno e modular, desenvolvido com foco em performance, escalabilidade e facilidade de uso para instituições de ensino. O backend é feito com Django e Django Rest Framework, e o frontend com Next.js e Tailwind CSS.

---

## 🚀 Status do Projeto

🛠️ Em desenvolvimento – versão MVP em progresso

---

## 📚 Funcionalidades Atuais

- ✅ Autenticação com JWT (registro, login, logout, refresh)
- ✅ Cadastro de usuários (alunos, responsáveis, administradores)
- ✅ Sistema de endereços reutilizável
- ✅ Integração entre aluno, responsável e usuário
- ✅ Cadastro de aluno com múltiplos responsáveis
- ✅ Testes automatizados no app `students`
- ✅ Integração com frontend (React/Next.js)
- ⬜ Dashboard administrativo
- ⬜ Sistema financeiro completo (mensalidades, cobranças)
- ⬜ Carteirinha escolar digital
- ⬜ Matrícula em lote (importação via planilha)
- ⬜ Migração de dados de sistemas legados
- ⬜ Logs e auditoria de ações

---

## 🧠 Tecnologias Utilizadas

### Backend
- Python 3.12
- Django 5.x
- Django Rest Framework
- PostgreSQL
- Docker + Docker Compose
- Pytest
- Redis (futuro uso com Celery)

### Frontend
- Next.js (App Router)
- Tailwind CSS
- shadcn/ui
- React Hook Form + Zod
- SSR via `next start`

### DevOps
- EasyPanel (self-hosted)
- GitHub Actions (planejado)
- Cloudflare Tunnel (dev/local)

---

## 🧪 Testes

- Cobertura de testes com Pytest
- Testes iniciados no app `students`
- Estratégia de testes: unitários, integração e API

---

## 🗂️ Estrutura de Apps

```
maxschool/
├── accounts/       # Autenticação, usuários, permissões
├── students/       # Cadastro e gerenciamento de alunos
├── responsibles/   # Módulo de responsáveis pelos alunos
├── address/        # Endereços reutilizáveis
├── core/           # Utilitários, mixins, middlewares
└── ...
```

---

## 📦 Como Rodar Localmente

1. Clone o repositório
2. Configure o `.env` baseado no `.env.example`
3. Suba com Docker:

```bash
docker-compose up --build
```

4. Acesse:
- Backend: http://localhost:8000/api/
- Frontend: http://localhost:3000/

---

## 🔐 Autenticação

- JWT via `djangorestframework-simplejwt`
- Suporte a múltiplos tipos de usuário
- Refresh token e proteção via TokenBlacklist

---

## 🧭 Roadmap da V2

- [ ] Sistema completo de cobrança e controle financeiro
- [ ] Geração de carteirinhas digitais com QR Code
- [ ] Visão administrativa via dashboard
- [ ] Upload em lote de alunos (planilha)
- [ ] Conversor de dados de sistemas legados
- [ ] API pública (documentada via Swagger)

---

## 📄 Licença

Em definição – projeto pessoal para portfólio e demonstração profissional
