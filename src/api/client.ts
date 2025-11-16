import axios, { type AxiosResponse } from 'axios'
import { authService } from './services/auth.service'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
})

apiClient.interceptors.request.use(
    (config) => {
        const token = authService.getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            authService.logout()
            window.location.href = '/login'
        }
        const message = error.response?.data?.message || error.message || 'Unknown error'
        return Promise.reject(new Error(message))
    }
)
