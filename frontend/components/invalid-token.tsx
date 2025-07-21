"use client"

import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface InvalidTokenProps {
  onRequestNewReset?: () => void
  onBackToLogin?: () => void
}

export function InvalidToken({ onRequestNewReset, onBackToLogin }: InvalidTokenProps) {
  const handleRequestNewReset = () => {
    if (onRequestNewReset) {
      onRequestNewReset()
    } else {
      window.location.href = "/forgot-password"
    }
  }

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin()
    } else {
      window.location.href = "/login"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Token Inválido ou Expirado</h1>

          <p className="text-gray-600 mb-8 text-lg">
            O link de redefinição de senha que você utilizou é inválido ou já expirou. Links de redefinição são válidos
            por apenas 24 horas.
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleRequestNewReset}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              <span>Solicitar Novo Link</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleBackToLogin}
              className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Voltar ao Login</span>
            </Button>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Dica:</strong> Verifique se você está usando o link mais recente enviado para seu email. Se você
              solicitou vários links, apenas o mais recente será válido.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
