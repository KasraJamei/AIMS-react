// src/hooks/useDashboard.ts

import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../api/services/dashboard.service'

export const useDashboard = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: dashboardService.getData,
        refetchInterval: 1000 * 60 * 2,
        staleTime: 1000 * 60 * 1,
    })
}
