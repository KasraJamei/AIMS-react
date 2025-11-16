// src/components/flights/SettingsModal.tsx

type SettingsModalProps = {
    open: boolean
    onClose: () => void
}

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg shadow-xl w-[900px] max-h-[90vh] overflow-auto transform transition-transform duration-200 ${open ? 'scale-100 translate-y-0' : 'scale-95 -translate-y-2'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h2 className="text-sm font-semibold">Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 text-xs space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">visibility</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                'blinkStatus',
                                'directionType',
                                'terminal',
                                'dayOfWeek',
                                'FaDate',
                                'EnDate',
                                'flight.no',
                                'stm',
                                'ata',
                                'etm',
                                'delayTime',
                                'destination',
                                'carrierAirlineCode',
                                'counters',
                                'gate',
                                'belt',
                                'via',
                                'internalRemarkCode',
                                'flightCategoryCode',
                                'visibility',
                                'validity',
                                'codeSharing master',
                                'codeSharing flight no',
                                'scheduled',
                                'flightType',
                                'publicRemark1',
                                'publicRemark2',
                                'rotationFlight',
                            ].map((name) => (
                                <label key={name} className="inline-flex items-center gap-1">
                                    <input type="checkbox" className="accent-blue-600" defaultChecked />
                                    <span>{name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">width and order</h3>
                        <div className="grid grid-cols-[1fr,1fr] gap-4">
                            {['Blink', 'A/D', 'Terminal', 'Day', 'FaDate', 'EnDate', 'Flight.no', 'STM', 'ATA', 'ETM'].map(
                                (label) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className="w-20 text-xs">{label}:</span>
                                        <input
                                            type="number"
                                            className="border rounded px-2 py-1 w-24 text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                                            defaultValue={50}
                                        />
                                        <span className="cursor-move text-gray-500 hover:text-gray-700">↕</span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between px-4 py-2 border-t bg-slate-50">
                    <button className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer">
                        Reset All Configs
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-3 py-1 text-xs rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal
