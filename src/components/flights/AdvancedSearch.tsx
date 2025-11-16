// src/components/flights/AdvancedSearch.tsx

import { useState } from 'react'

export type AdvancedSearchParams = {
    startDate?: string
    endDate?: string
    flightNumber?: string
}

type AdvancedSearchProps = {
    open: boolean
    onSearch: (params: AdvancedSearchParams) => void
}

export const AdvancedSearch = ({ open, onSearch }: AdvancedSearchProps) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [flightNumber, setFlightNumber] = useState('')

    const handleSearch = () => {
        onSearch({
            startDate: startDate || undefined,
            endDate: endDate || undefined,
            flightNumber: flightNumber || undefined,
        })
    }

    const handleClear = () => {
        setStartDate('')
        setEndDate('')
        setFlightNumber('')
        onSearch({})
    }

    if (!open) return null

    return (
        <div className="border-t border-slate-200 bg-white px-4 py-3 text-xs">
            <h3 className="font-semibold mb-2">Advanced Search</h3>
            <div className="grid grid-cols-4 gap-2">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                />
                <input
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                    placeholder="Flight Number"
                />
                <select className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none">
                    <option>Arr</option>
                    <option>Dep</option>
                </select>
            </div>
            <div className="flex justify-end gap-2 mt-3">
                <button
                    onClick={handleSearch}
                    className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                    Search
                </button>
                <button
                    onClick={handleClear}
                    className="px-3 py-1 text-xs rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                >
                    Clear
                </button>
            </div>
        </div>
    )
}

export default AdvancedSearch
