"use client"
import { LoginForm } from "./components/auth/login-form"
import { authAPI, type LoginCredentials } from "./lib/auth-api"
import { GraduationCap, BookOpen, Users, Award } from "lucide-react"

export default function LoginPage() {
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await authAPI.login(credentials)

      if (response.success) {
        // Redirecionar para dashboard ou página principal
        window.location.href = "/dashboard"
      } else {
        throw new Error(response.message || "Erro ao fazer login")
      }
    } catch (error) {
      // O erro será tratado pelo componente LoginForm
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Formulário de Login */}
        <div className="flex justify-center lg:justify-end">
          <LoginForm onLogin={handleLogin} />
        </div>

        {/* Área de Ilustração */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gray-800">Bem-vindo ao MaxSchool</h2>
            <p className="text-xl text-gray-600 max-w-md">A plataforma completa para gestão educacional moderna</p>
          </div>

          {/* Ícones Educacionais */}
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-3 p-6 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Cursos</span>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Alunos</span>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Notas</span>
            </div>

            <div className="flex flex-col items-center space-y-3 p-6 bg-white/60 rounded-2xl backdrop-blur-sm shadow-lg">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Diplomas</span>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">© 2025 MaxSchool. Todos os direitos reservados.</p>
          </div>
        </div>

        {/* Versão Mobile da Ilustração */}
        <div className="lg:hidden flex flex-col items-center space-y-6 mt-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">MaxSchool</h3>
            <p className="text-gray-600">Gestão educacional moderna</p>
          </div>

          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600">Cursos</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600">Alunos</span>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600">Notas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
