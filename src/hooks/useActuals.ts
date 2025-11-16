// src/hooks/useActuals.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { actualService } from '../api/services/actual.service'
import type { ActualSearchParams, ActualResponse } from '../api/types/actual.types'

type UseActualsResult = {
  data?: ActualResponse
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

export const useActuals = (params: ActualSearchParams): UseActualsResult => {
  const query = useQuery<ActualResponse, Error>({
    queryKey: ['actuals', params],
    queryFn: async () => {
      console.log('Calling /api/v2/Actual with params:', params)
      const res = await actualService.getAll(params)
      console.log('Actuals response:', res)
      return res
    },
    retry: 0,
    staleTime: 30_000,
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error ?? null,
    refetch: query.refetch,
  }
}

export const useDeleteActual = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      console.log('Deleting actual flight id:', id)
      await actualService.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['actuals'] })
    },
    onError: (err) => {
      alert(err.message || 'Failed to delete flight. Please try again.')
    },
  })
}
