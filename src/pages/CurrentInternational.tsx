// src/pages/CurrentInternational.tsx

import { useState } from 'react'
import { useActuals, useDeleteActual } from '../hooks/useActuals'
import FlightTable from '../components/flights/FlightTable'
import type { ActualFlight } from '../api/types/actual.types'

const CurrentInternational = () => {
    const [searchText] = useState('')
    const [directionType] = useState<'Arrival' | 'Departure'>('Arrival')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 20

    const { data, isLoading, error } = useActuals({
        flightCategory: 'International',
        directionType,
        searchText: searchText || undefined,
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    })

    const deleteMutation = useDeleteActual()

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this flight?')) {
            await deleteMutation.mutateAsync(id)
        }
    }

    const handleEdit = (flight: ActualFlight) => {
        console.log('Edit flight', flight)
    }

    const totalPages = data?.total ? Math.ceil(data.total / pageSize) : 1

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify_between">
                <h1 className="text-2xl font-bold text-gray-900">International Flights</h1>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    Error loading flights: {error.message}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <FlightTable
                    flights={data?.data || []}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {data && totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default CurrentInternational
