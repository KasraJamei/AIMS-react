// src/components/flights/ActualTable.tsx

import type { ActualFlight } from '../../api/types/actual.types'

const PAGE_SIZE = 20

type Props = {
    title: string
    search: string
    setSearch: (val: string) => void
    currentPage: number
    setCurrentPage: (val: number) => void
    data?: { data: ActualFlight[]; total: number }
    isLoading: boolean
    error: Error | null
    onDelete: (id: number) => void

    // دکمه‌ها
    onSettings: () => void
    onAdd: () => void
    onExportExcel: () => void
    onRefresh: () => void
    onFilter: () => void
}

const getBlinkColor = (blink?: string) => {
    if (blink === 'red') return 'bg-red-500'
    if (blink === 'green') return 'bg-green-500'
    return 'bg-gray-400'
}

export const ActualTable = ({
    title,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    data,
    isLoading,
    error,
    onDelete,
    onSettings,
    onAdd,
    onExportExcel,
    onRefresh,
    onFilter,
}: Props) => {
    const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1
    const rows = data?.data ?? []

    return (
        <div className="w-full h-full flex flex-col bg-slate-100 border border-slate-200 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-2 pb-1 bg-slate-50 border-b">
                <div className="flex items-center gap-3">
                    <span className="text-base font-semibold">{title}</span>
                    <select className="border border-gray-300 rounded px-2 py-1 text-xs bg-white">
                        <option>Arr/Dep</option>
                    </select>
                    <div className="relative w-64">
                        <input
                            className="w-full border border-gray-300 rounded-full py-1.5 pl-3 pr-8 text-xs"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setCurrentPage(1)
                            }}
                        />
                        <span className="absolute right-2 top-1.5 text-gray-500 text-sm">🔍</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                    <button
                        onClick={onSettings}
                        className="px-3 py-1 border rounded-full bg-white hover:bg-slate-100"
                    >
                        ⚙️ Settings
                    </button>
                    <button
                        onClick={onAdd}
                        className="px-3 py-1 border rounded-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                        ➕ Add
                    </button>
                    <button
                        onClick={onExportExcel}
                        className="px-3 py-1 border rounded-full bg-white hover:bg-slate-100"
                    >
                        ⬇️ Export
                    </button>
                    <button
                        onClick={onRefresh}
                        className="px-3 py-1 border rounded-full bg-white hover:bg-slate-100"
                    >
                        🔃 Refresh
                    </button>
                    <button
                        onClick={onFilter}
                        className="px-3 py-1 border rounded-full bg-white hover:bg-slate-100"
                    >
                        🔎 Filter
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 px-4 py-2 text-xs border-b border-red-200">
                    {error.message}
                </div>
            )}

            {/* Table */}
            <div className="max-h-[340px] overflow-auto bg-white">
                <table className="min-w-full text-[11px] whitespace-nowrap">
                    <thead className="sticky top-0 bg-white border-b border-gray-200">
                        <tr className="text-gray-700">
                            <th className="px-2 py-1">Blink</th>
                            <th className="px-2 py-1">A/D</th>
                            <th className="px-2 py-1">Terminal</th>
                            <th className="px-2 py-1">Day</th>
                            <th className="px-2 py-1">FaDate</th>
                            <th className="px-2 py-1">EnDate</th>
                            <th className="px-2 py-1">Flight.no</th>
                            <th className="px-2 py-1">STM</th>
                            <th className="px-2 py-1">ATA</th>
                            <th className="px-2 py-1">ETM</th>
                            <th className="px-2 py-1">Delay</th>
                            <th className="px-2 py-1">Airline</th>
                            <th className="px-2 py-1">Logo</th>
                            <th className="px-2 py-1">origin</th>
                            <th className="px-2 py-1">destination</th>
                            <th className="px-2 py-1">C</th>
                            <th className="px-2 py-1">G</th>
                            <th className="px-2 py-1">B</th>
                            <th className="px-2 py-1">Reg</th>
                            <th className="px-2 py-1">Park position</th>
                            <th className="px-2 py-1">Route</th>
                            <th className="px-2 py-1">via</th>
                            <th className="px-2 py-1">Internal Remark</th>
                            <th className="px-2 py-1">flightCategory</th>
                            <th className="px-2 py-1">visibility</th>
                            <th className="px-2 py-1">validity</th>
                            <th className="px-2 py-1">codeSharing master</th>
                            <th className="px-2 py-1">codeSharing flight no</th>
                            <th className="px-2 py-1">scheduled</th>
                            <th className="px-2 py-1">flightType</th>
                            <th className="px-2 py-1">Public Remark 1</th>
                            <th className="px-2 py-1">Public Remark 2</th>
                            <th className="px-2 py-1">rotationFlight</th>
                            <th className="px-2 py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={34} className="text-center py-10 text-blue-600">
                                    Loading...
                                </td>
                            </tr>
                        ) : rows.length === 0 ? (
                            <tr>
                                <td colSpan={34} className="text-center py-10 text-gray-400">
                                    No flights found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr key={row.id} className="border-b border-gray-100 hover:bg-slate-50">
                                    <td className="px-2 py-1">
                                        <span
                                            className={`inline-block w-3 h-3 rounded-full ${getBlinkColor(row.blink)}`}
                                        />
                                    </td>
                                    <td className="px-2 py-1">{row.directionType ?? ''}</td>
                                    <td className="px-2 py-1">{row.terminalCode ?? ''}</td>
                                    <td className="px-2 py-1">{row.dayOfWeek ?? ''}</td>
                                    <td className="px-2 py-1">{row.faDate ?? ''}</td>
                                    <td className="px-2 py-1 text-emerald-600">{row.enDate ?? ''}</td>
                                    <td className="px-2 py-1 font-semibold">{row.flightNumber ?? ''}</td>
                                    <td className="px-2 py-1">{row.stm ?? ''}</td>
                                    <td className="px-2 py-1">{row.ata ?? ''}</td>
                                    <td className="px-2 py-1">{row.etm ?? ''}</td>
                                    <td className="px-2 py-1">{row.delay ?? ''}</td>
                                    <td className="px-2 py-1 text-sky-700">{row.airlineName ?? ''}</td>
                                    <td className="px-2 py-1">
                                        {row.logo ? (
                                            <img src={row.logo} alt="logo" className="w-7 h-7 object-contain" />
                                        ) : (
                                            ''
                                        )}
                                    </td>
                                    <td className="px-2 py-1">{row.origin ?? ''}</td>
                                    <td className="px-2 py-1">{row.destination ?? ''}</td>
                                    <td className="px-2 py-1">{row.counter ?? ''}</td>
                                    <td className="px-2 py-1">{row.gate ?? ''}</td>
                                    <td className="px-2 py-1">{row.belt ?? ''}</td>
                                    <td className="px-2 py-1">{row.registration ?? ''}</td>
                                    <td className="px-2 py-1">{row.parkPosition ?? ''}</td>
                                    <td className="px-2 py-1 text-emerald-600">{row.route ?? ''}</td>
                                    <td className="px-2 py-1">{row.via ?? ''}</td>
                                    <td className="px-2 py-1">{row.internalRemark ?? ''}</td>
                                    <td className="px-2 py-1">{row.flightCategory ?? ''}</td>
                                    <td className="px-2 py-1">{row.visibility ?? ''}</td>
                                    <td className="px-2 py-1">{row.validity ?? ''}</td>
                                    <td className="px-2 py-1">{row.codeSharing?.master ?? ''}</td>
                                    <td className="px-2 py-1">{row.codeSharing?.flightNo ?? ''}</td>
                                    <td className="px-2 py-1">{row.scheduled ?? ''}</td>
                                    <td className="px-2 py-1">{row.flightType ?? ''}</td>
                                    <td className="px-2 py-1">{row.publicRemark1 ?? ''}</td>
                                    <td className="px-2 py-1">{row.publicRemark2 ?? ''}</td>
                                    <td className="px-2 py-1">{row.rotationFlight ?? ''}</td>
                                    <td className="px-2 py-1">
                                        <div className="flex gap-1 justify-end">
                                            <button
                                                title="Edit"
                                                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                title="More"
                                                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs"
                                            >
                                                ➕
                                            </button>
                                            <button
                                                title="Delete"
                                                onClick={() => onDelete(row.id)}
                                                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-1.5 text-[11px] bg-slate-50 border-t">
                <span>
                    {data
                        ? `${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(
                            currentPage * PAGE_SIZE,
                            data.total,
                        )} of ${data.total} items`
                        : '0 of 0 items'}
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                        className="border rounded px-2 py-0.5 bg-white disabled:opacity-40"
                    >
                        {'<'}
                    </button>
                    <span className="border rounded px-2 py-0.5 bg-white">{currentPage}</span>
                    <button
                        onClick={() =>
                            setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)
                        }
                        disabled={currentPage === totalPages}
                        className="border rounded px-2 py-0.5 bg-white disabled:opacity-40"
                    >
                        {'>'}
                    </button>
                    <select
                        className="border rounded px-2 py-0.5 bg-white"
                        value={PAGE_SIZE}
                        disabled
                    >
                        <option>20 / page</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
