// src/api/services/actual.service.ts

import { apiClient } from '../client'
import type {
    ActualFlight,
    ActualSearchParams,
    ActualResponse,
} from '../types/actual.types'

export const actualService = {
    getAll: (params?: ActualSearchParams): Promise<ActualResponse> => {
        return apiClient.get('/api/v2/Actual', { params })
    },

    getById: (id: number): Promise<ActualFlight> => {
        return apiClient.get(`/api/v2/Actual/${id}`)
    },

    create: (data: Partial<ActualFlight>): Promise<ActualFlight> => {
        return apiClient.post('/api/v2/Actual', data)
    },

    update: (data: ActualFlight): Promise<ActualFlight> => {
        return apiClient.put('/api/v2/Actual/Quick', data)
    },

    delete: (id: number): Promise<void> => {
        return apiClient.delete(`/api/v2/Actual/${id}`)
    },

    // این متد را اضافه کن
    exportExcel: (params?: ActualSearchParams): Promise<Blob> => {
        return apiClient.get('/api/v2/Actual/ExportExcel', {
            params,
            responseType: 'blob',
        })
    },
}
