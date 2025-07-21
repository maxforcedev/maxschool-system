"use client"

import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PasswordSuccessProps {
  onGoToLogin?: () => void
}

export function PasswordSuccess({ onGoToLogin }: PasswordSuccessProps) {
  const handleGoToLogin = () => {
    if (onGoToLogin) {
      onGoToLogin()
    } else {
      window.location.href = "/login"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Senha Redefinida com Sucesso!</h1>

          <p className="text-gray-600 mb-8 text-lg">
            Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha no MaxSchool.
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleGoToLogin}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>Fazer Login Agora</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Lembre-se de manter sua senha segura e não compartilhá-la com ninguém.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
