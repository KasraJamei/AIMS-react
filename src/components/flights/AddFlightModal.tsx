// src/components/flights/AddFlightModal.tsx

import type { ActualFlight } from '../../api/types/actual.types'

type AddFlightModalProps = {
    open: boolean
    onClose: () => void
    directionType: 'Arrival' | 'Departure'
    flightCategory: 'Domestic' | 'International'
    onSubmit: (data: Partial<ActualFlight>) => void
}

const AddFlightModal = ({
    open,
    onClose,
    directionType,
    flightCategory,
    onSubmit,
}: AddFlightModalProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const fd = new FormData(form)
        onSubmit({
            directionType,
            flightCategory,
            flightNumber: fd.get('flightNumber')?.toString(),
            terminalCode: fd.get('terminal')?.toString(),
            origin: fd.get('origin')?.toString(),
        })
        onClose()
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            onClick={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className={`bg-white rounded-lg shadow-xl w-[1100px] max-h-[90vh] overflow-auto text-xs transform transition-transform duration-200 ${open ? 'scale-100 translate-y-0' : 'scale-95 -translate-y-2'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h2 className="text-sm font-semibold">Insert flight / {directionType}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 grid gap-2">
                    <div className="grid grid-cols-[120px,1fr] gap-2 items-center">
                        <span className="font-semibold">Flight key:</span>
                        <div className="grid grid-cols-[80px,1fr,80px,160px] gap-2">
                            <select
                                name="ad"
                                className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                            >
                                <option value="ARR">ARR</option>
                                <option value="DEP">DEP</option>
                            </select>
                            <input
                                name="scheduleDate"
                                type="date"
                                className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                                required
                            />
                            <input
                                name="stm"
                                placeholder="STM"
                                className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                            />
                            <input
                                name="flightNumber"
                                placeholder="Flight Number"
                                className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-[120px,1fr] gap-2 items-center">
                        <span className="font-semibold">Flight Category:</span>
                        <div className="grid grid-cols-[1fr,1fr] gap-2">
                            <select
                                name="flightCategory"
                                defaultValue={flightCategory}
                                className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                            >
                                <option value="Domestic">Domestic</option>
                                <option value="International">International</option>
                            </select>
                            <select
                                name="flightType"
                                className="border rounded px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                            >
                                <option>Scheduled-Passenger Normal Service</option>
                            </select>
                        </div>
                    </div>

                    {/* other rows can be added here */}
                </div>

                <div className="flex justify-end gap-2 px-4 py-2 border-t bg-slate-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3 py-1 text-xs rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Insert
                    </button>
                    <button
                        type="submit"
                        className="px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                    >
                        Insert/New
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddFlightModal
