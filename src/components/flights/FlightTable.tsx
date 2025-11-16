// src/components/flights/FlightTable.tsx

import type { ActualFlight } from '../../api/types/actual.types'

interface FlightTableProps {
    flights: ActualFlight[]
    isLoading: boolean
    onEdit?: (flight: ActualFlight) => void
    onDelete?: (id: number) => void
}

const FlightTable = ({ flights, isLoading, onEdit, onDelete }: FlightTableProps) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        )
    }

    if (!flights || flights.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">📭</div>
                <p className="text-gray-500">No data available</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blink</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">A/D</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terminal</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FaDate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EnDate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight.no</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STM</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ATA/ATD</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETM</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gate</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {flights.map((flight) => (
                        <tr key={flight.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap">
                                <div
                                    className={`w-3 h-3 rounded-full ${flight.blink === 'red'
                                            ? 'bg-red-500'
                                            : flight.blink === 'green'
                                                ? 'bg-green-500'
                                                : 'bg-gray-300'
                                        }`}
                                />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                    {flight.directionType === 'Arrival' ? '🛬' : '✈️'}
                                </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{flight.terminalCode || '-'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{flight.dayOfWeek || '-'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{flight.faDate || '-'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">{flight.enDate || '-'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {flight.flightNumber || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{flight.stm || '-'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {flight.ata || flight.atd || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{flight.etm || '-'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {flight.delay ?? '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <span className="text-sm text-blue-600 font-medium">
                                    {flight.airlineName || flight.airlineCode || '-'}
                                </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                                {flight.origin || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600">
                                {flight.destination || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {flight.gate || '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                    <button
                                        onClick={() => onEdit?.(flight)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete?.(flight.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FlightTable
