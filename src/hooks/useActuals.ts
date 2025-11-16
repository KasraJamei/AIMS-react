// src/hooks/useActuals.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { actualService } from '../api/services/actual.service'
import type { ActualSearchParams, ActualFlight } from '../api/types/actual.types'

export const useActuals = (params?: ActualSearchParams) => {
    return useQuery({
        queryKey: ['actuals', params],
        queryFn: () => actualService.getAll(params),
        refetchInterval: 1000 * 30,
        staleTime: 1000 * 20,
    })
}

export const useActual = (id: number) => {
    return useQuery({
        queryKey: ['actual', id],
        queryFn: () => actualService.getById(id),
        enabled: !!id,
    })
}

export const useDeleteActual = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: actualService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['actuals'] })
        },
    })
}

export const useUpdateActual = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: actualService.update,
        onSuccess: (data: ActualFlight) => {
            queryClient.invalidateQueries({ queryKey: ['actuals'] })
            queryClient.invalidateQueries({ queryKey: ['actual', data.id] })
        },
    })
}
