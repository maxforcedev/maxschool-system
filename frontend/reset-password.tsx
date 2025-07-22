"use client"

import { useState, useEffect } from "react"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { InvalidToken } from "@/components/auth/invalid-token"
import { PasswordSuccess } from "@/components/auth/password-success"
import { authAPI } from "@/lib/auth-api"

interface ResetPasswordPageProps {
  token?: string
}

export default function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false)
        return
      }

      try {
        const isValid = await authAPI.validateResetToken(token)
        setIsValidToken(isValid)
      } catch (error) {
        setIsValidToken(false)
      }
    }

    validateToken()
  }, [token])

  const handleResetPassword = async (password: string, confirmPassword: string, resetToken: string) => {
    try {
      const response = await authAPI.resetPassword(password, confirmPassword, resetToken)

      if (response.success) {
        setIsSuccess(true)
      } else {
        throw new Error(response.message || "Erro ao redefinir senha")
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("inválido")) {
        setIsValidToken(false)
      }
      throw error
    }
  }

  const handleRequestNewReset = () => {
    window.location.href = "/forgot-password"
  }

  const handleBackToLogin = () => {
    window.location.href = "/login"
  }

  // Loading state
  if (isValidToken === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Validando token...</p>
        </div>
      </div>
    )
  }

  // Success state
  if (isSuccess) {
    return <PasswordSuccess onGoToLogin={handleBackToLogin} />
  }

  // Invalid token state
  if (!isValidToken) {
    return <InvalidToken onRequestNewReset={handleRequestNewReset} onBackToLogin={handleBackToLogin} />
  }

  // Valid token - show reset form
  return <ResetPasswordForm token={token} onResetPassword={handleResetPassword} onBackToLogin={handleBackToLogin} />
}
