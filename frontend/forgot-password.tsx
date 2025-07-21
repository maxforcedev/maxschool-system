"use client"

import { ForgotPasswordForm } from "././components/forgot-password-form"
import { authAPI } from "./lib/auth-api"

export default function ForgotPasswordPage() {
  const handleSendReset = async (email: string) => {
    try {
      const response = await authAPI.forgotPassword(email)

      if (!response.success) {
        throw new Error(response.message || "Erro ao enviar email de recuperação")
      }
    } catch (error) {
      // O erro será tratado pelo componente ForgotPasswordForm
      throw error
    }
  }

  const handleBackToLogin = () => {
    // Redirecionar para a página de login
    window.location.href = "/login"
  }

  return <ForgotPasswordForm onSendReset={handleSendReset} onBackToLogin={handleBackToLogin} />
}
