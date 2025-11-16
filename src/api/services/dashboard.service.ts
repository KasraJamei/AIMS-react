// src/api/services/dashboard.service.ts

import { apiClient } from '../client'

export interface DashboardData {
    arrivals: number
    departures: number
    totalDevices: number
    counters: number
    gates: number
    belts: number
    totalFlights: number
    domestic: number
    international: number
}

export const dashboardService = {
    getData: async (): Promise<DashboardData> => {
        return apiClient.get('/api/v2/DashBoard')
    },
}
