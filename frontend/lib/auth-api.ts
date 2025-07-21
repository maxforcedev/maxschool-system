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

export class AuthAPI {
  private baseURL: string

  constructor(baseURL = "/api") {
    this.baseURL = baseURL
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("Erro na requisição")
      }

      const data: LoginResponse = await response.json()

      if (data.success && data.token) {
        // Salvar token no localStorage ou cookie
        if (credentials.rememberMe) {
          localStorage.setItem("auth_token", data.token)
        } else {
          sessionStorage.setItem("auth_token", data.token)
        }
      }

      return data
    } catch (error) {
      throw new Error("Email ou senha inválidos")
    }
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/forgot-password`, {
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
      throw new Error("Erro ao enviar email de recuperação. Verifique se o email está correto.")
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
