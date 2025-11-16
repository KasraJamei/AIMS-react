// src/hooks/useActuals.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { actualService } from '../api/services/actual.service'
import type { ActualFlight, ActualSearchParams, ActualResponse } from '../api/types/actual.types'

export const useActuals = (params?: ActualSearchParams) => {
  return useQuery<ActualResponse, Error>({
    queryKey: ['actuals', params],
    queryFn: () => actualService.getAll(params),
  })
}

export const useActual = (id: number) => {
  return useQuery<ActualFlight, Error>({
    queryKey: ['actual', id],
    queryFn: () => actualService.getById(id),
    enabled: id != null,
  })
}

export const useDeleteActual = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: (id: number) => actualService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actuals'] })
    },
  })
}

export const useUpdateActual = () => {
  const queryClient = useQueryClient()

  return useMutation<ActualFlight, Error, ActualFlight>({
    mutationFn: (data: ActualFlight) => actualService.update(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['actuals'] })
      queryClient.invalidateQueries({ queryKey: ['actual', data.id] })
    },
  })
}
