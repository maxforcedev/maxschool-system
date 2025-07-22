// Exemplo de integração com API
export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginResponse {
  success: boolean
  token?: string
  user?: {
    id: string
    name: string
    email: string
    role: "teacher" | "student" | "admin"
  }
  message?: string
}

export interface ForgotPasswordResponse {
  success: boolean
  message?: string
}

export interface ResetPasswordResponse {
  success: boolean
  message?: string
}

export class AuthAPI {
  private baseURL: string

  constructor(baseURL = process.env.NEXT_PUBLIC_API_URL || "/api") {
    this.baseURL = baseURL
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("Erro na requisição")
      }

      const data = await response.json()

      if (data.success && data.token) {
        // Salvar token no localStorage ou cookie
        if (credentials.rememberMe) {
          localStorage.setItem("auth_token", data.token)
          sessionStorage.setItem("refresh_token", data.refresh)
        } else {
          sessionStorage.setItem("auth_token", data.token)
          sessionStorage.setItem("refresh_token", data.refresh)
        }
      }

      return {
        success: true,
        token: data.access,
        user: data.user,
      }
    } catch (error) {
      throw new Error("Email ou senha inválidos")
    }
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/forgot-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Erro na requisição")
      }

      const data: ForgotPasswordResponse = await response.json()
      return data
    } catch (error) {
      throw new Error("Erro ao enviar email de recuperação, tente novamente mais tarde.")
    }
  }
  async resetPassword(password: string, confirmPassword: string, token: string): Promise<ResetPasswordResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/reset-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, confirm_password:confirmPassword, token }),
      })

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Token inválido ou expirado")
        }
        throw new Error("Erro na requisição")
      }

      const data: ResetPasswordResponse = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Erro ao redefinir senha")
    }
  }

  async validateResetToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/auth/validate-reset-token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      return response.ok
    } catch (error) {
      return false
    }
  }
  async logout(): Promise<void> {
    localStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_token")
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

// Instância singleton da API
export const authAPI = new AuthAPI()
