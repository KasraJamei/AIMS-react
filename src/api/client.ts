// src/api/client.ts

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
    (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        // برای دیباگ ببینیم چرا 404/401 می‌گیری
        console.error('API error:', error.response?.status, error.response?.data)
        return Promise.reject(error)
    },
)
