// src/api/services/actual.service.ts

import { apiClient } from '../client'
import type {
    ActualFlight,
    ActualSearchParams,
    ActualResponse,
} from '../types/actual.types'

type RawActualArray = ActualFlight[]
type RawActualEnvelope = {
    data: ActualFlight[]
    total?: number
}

const isRawArray = (raw: unknown): raw is RawActualArray =>
    Array.isArray(raw)

const isRawEnvelope = (raw: unknown): raw is RawActualEnvelope =>
    !!raw &&
    typeof raw === 'object' &&
    Array.isArray((raw as RawActualEnvelope).data)

const normalizeActualResponse = (raw: unknown): ActualResponse => {
    if (!raw) {
        return {
            data: [],
            total: 0,
        }
    }

    if (isRawArray(raw)) {
        return {
            data: raw,
            total: raw.length,
        }
    }

    if (isRawEnvelope(raw)) {
        const data = raw.data
        const total = typeof raw.total === 'number' ? raw.total : data.length
        return { data, total }
    }

    return {
        data: [],
        total: 0,
    }
}

export const actualService = {
    getAll: async (params?: ActualSearchParams): Promise<ActualResponse> => {
        const res = await apiClient.get<RawActualArray | RawActualEnvelope | string>(
            '/api/v2/Actual',
            { params },
        )

        console.log('GET /api/v2/Actual status:', res.status)
        console.log('GET /api/v2/Actual raw data:', res.data)

        return normalizeActualResponse(res.data)
    },

    getById: async (id: number): Promise<ActualFlight> => {
        const res = await apiClient.get<ActualFlight>(`/api/v2/Actual/${id}`)
        return res.data
    },

    create: async (data: Partial<ActualFlight>): Promise<ActualFlight> => {
        const res = await apiClient.post<ActualFlight>('/api/v2/Actual', data)
        return res.data
    },

    update: async (data: ActualFlight): Promise<ActualFlight> => {
        const res = await apiClient.put<ActualFlight>('/api/v2/Actual/Quick', data)
        return res.data
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/api/v2/Actual/${id}`)
    },

    exportExcel: async (params?: ActualSearchParams): Promise<Blob> => {
        const res = await apiClient.get<Blob>('/api/v2/Actual/ExportExcel', {
            params,
            responseType: 'blob',
        })
        return res.data
    },
}
