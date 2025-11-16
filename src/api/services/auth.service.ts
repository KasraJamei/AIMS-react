import { apiClient } from '../client'

export interface LoginRequest {
    username: string
    password: string
}

export interface RegisterRequest {
    username: string
    password: string
    email: string
}

export interface AuthResponse {
    token: string
    user: {
        id: number
        username: string
        email: string
    }
}

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        return apiClient.post('/api/v2/Auth/Login', data)
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        return apiClient.post('/api/v2/Auth/Register', data)
    },

    logout: () => {
        localStorage.removeItem('authToken')
    },

    getToken: () => {
        return localStorage.getItem('authToken')
    },

    setToken: (token: string) => {
        localStorage.setItem('authToken', token)
    },
}
