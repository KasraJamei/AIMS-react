// src/pages/CurrentInternational.tsx

import { useState } from 'react'
import { useActuals, useDeleteActual } from '../hooks/useActuals'
import FlightTable from '../components/flights/FlightTable'
import type { ActualFlight } from '../api/types/actual.types'

const CurrentInternational = () => {
    const [searchText, setSearchText] = useState('')
    const [directionType, setDirectionType] = useState<'Arrival' | 'Departure'>('Arrival')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 20

    const { data, isLoading, error, refetch } = useActuals({
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
        console.log('Edit flight:', flight)
    }

    const handleExport = () => {
        console.log('Export to Excel')
    }

    const totalPages = data?.total ? Math.ceil(data.total / pageSize) : 1

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <span className="mr-2">🌍</span>
                        International Flights
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Showing {data?.data?.length || 0} of {data?.total || 0} flights
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
                        <button
                            onClick={() => setDirectionType('Arrival')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${directionType === 'Arrival'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Arr/Dep: Arrival
                        </button>
                        <button
                            onClick={() => setDirectionType('Departure')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${directionType === 'Departure'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Arr/Dep: Departure
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search flights..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => refetch()}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Refresh"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>

                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export
                        </button>

                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Flight
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">Error loading flights: {error.message}</p>
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

            {data && data.total > pageSize && (
                <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
                    <div className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            const page = i + 1
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-lg text-sm ${currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        })}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>

                    <div className="text-sm text-gray-600">
                        20 / page
                    </div>
                </div>
            )}
        </div>
    )
}

export default CurrentInternational
