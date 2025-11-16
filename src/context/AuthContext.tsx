// src/context/AuthContext.tsx

/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, type ReactNode } from 'react'
import { authService, type AuthResponse } from '../api/services/auth.service'

export type AuthContextType = {
    isAuthenticated: boolean
    token: string | null
    user: AuthResponse['user'] | null
    login: (token: string, user: AuthResponse['user']) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => authService.getToken())
    const [user, setUser] = useState<AuthResponse['user'] | null>(null)

    const login = (newToken: string, userData: AuthResponse['user']) => {
        authService.setToken(newToken)
        setToken(newToken)
        setUser(userData)
    }

    const logout = () => {
        authService.logout()
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
