import axios, { type AxiosResponse } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
    validateStatus: () => true,
})

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        console.error('API Error:', error)
        return Promise.reject(error)
    }
)
