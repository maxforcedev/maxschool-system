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

      // Armazenar tokens
      if (data.access) {
        if (credentials.rememberMe) {
          localStorage.setItem("auth_token", data.access)
          localStorage.setItem("refresh_token", data.refresh)
        } else {
          sessionStorage.setItem("auth_token", data.access)
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
