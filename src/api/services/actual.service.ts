// src/api/services/actual.service.ts

import { apiClient } from '../client'
import type { ActualFlight, ActualSearchParams, ActualResponse } from '../types/actual.types'

export const actualService = {
    getAll: async (params?: ActualSearchParams): Promise<ActualResponse> => {
        return apiClient.get('/api/v2/Actual', { params })
    },

    getById: async (id: number): Promise<ActualFlight> => {
        return apiClient.get(`/api/v2/Actual/${id}`)
    },

    create: async (data: Partial<ActualFlight>): Promise<ActualFlight> => {
        return apiClient.post('/api/v2/Actual', data)
    },

    update: async (data: ActualFlight): Promise<ActualFlight> => {
        return apiClient.put('/api/v2/Actual/Quick', data)
    },

    delete: async (id: number): Promise<void> => {
        return apiClient.delete(`/api/v2/Actual/${id}`)
    },
}
