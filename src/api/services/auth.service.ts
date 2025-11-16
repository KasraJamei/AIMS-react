// src/api/services/auth.service.ts

export interface LoginRequest {
    username: string
    password: string
}

export interface RegisterRequest {
    username: string
    email: string
    password: string
}

export interface AuthResponse {
    token: string
    user: {
        id: number
        username: string
        email: string
    }
}

type LocalUser = {
    id: number
    username: string
    email: string
    password: string
}

const USERS_KEY = '__AIMS_USERS__'
const TOKEN_KEY = 'authToken'

const getUsers = (): LocalUser[] => {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    try {
        return JSON.parse(raw) as LocalUser[]
    } catch {
        return []
    }
}

const saveUsers = (users: LocalUser[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const generateToken = (userId: number) => `mock-token-${userId}-${Date.now()}`

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const users = getUsers()
        const user = users.find(u => u.username === data.username && u.password === data.password)
        if (!user) throw new Error('Invalid username or password')
        const token = generateToken(user.id)
        localStorage.setItem(TOKEN_KEY, token)
        return {
            token,
            user: { id: user.id, username: user.username, email: user.email }
        }
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const users = getUsers()
        if (users.find(u => u.username === data.username))
            throw new Error('Username is already taken')
        if (users.find(u => u.email === data.email))
            throw new Error('Email address already registered')

        const user: LocalUser = {
            id: Date.now(),
            username: data.username,
            email: data.email,
            password: data.password,
        }
        users.push(user)
        saveUsers(users)
        const token = generateToken(user.id)
        localStorage.setItem(TOKEN_KEY, token)
        return {
            token,
            user: { id: user.id, username: user.username, email: user.email }
        }
    },

    logout: (): void => {
        localStorage.removeItem(TOKEN_KEY)
    },

    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY)
    },

    setToken: (token: string): void => {
        localStorage.setItem(TOKEN_KEY, token)
    }
}
