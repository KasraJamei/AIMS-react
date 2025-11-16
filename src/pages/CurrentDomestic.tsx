// src/pages/CurrentDomestic.tsx

import { useState } from 'react'
import { useActuals, useDeleteActual } from '../hooks/useActuals'
import { actualService } from '../api/services/actual.service'
import ActualTable from '../components/flights/ActualTable'
import SettingsModal from '../components/flights/SettingsModal'
import AddFlightModal from '../components/flights/AddFlightModal'
import AdvancedSearch from '../components/flights/AdvancedSearch'
import type { AdvancedSearchParams } from '../components/flights/AdvancedSearch'
import type { ActualSearchParams } from '../api/types/actual.types'

const PAGE_SIZE = 20

type SectionProps = {
    title: string
    baseParams: ActualSearchParams
    showFilterDropdown?: boolean
}

const DomesticSection = ({ title, baseParams, showFilterDropdown }: SectionProps) => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const [filtersOpen, setFiltersOpen] = useState(false)

    const params: ActualSearchParams = {
        ...baseParams,
        searchText: search || undefined,
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
    }

    const { data, isLoading, error, refetch } = useActuals(params)
    const deleteMutation = useDeleteActual()

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this flight?')) {
            deleteMutation.mutateAsync(id).then(() => refetch())
        }
    }

    const handleExportExcel = async () => {
        try {
            const blob = await actualService.exportExcel(params)
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${title}-flights.xlsx`
            a.click()
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Export excel failed:', err)
            alert('Export excel failed. Please try again.')
        }
    }

    const handleAdd = () => setAddOpen(true)
    const handleSettings = () => setSettingsOpen(true)

    const handleFilter = () => {
        if (!showFilterDropdown) return
        setFiltersOpen((prev) => !prev)
    }

    const handleAdvancedSearch = ({ startDate, endDate, flightNumber }: AdvancedSearchParams) => {
        setFiltersOpen(false)
        console.log('Advanced search applied:', { startDate, endDate, flightNumber })
    }

    return (
        <div className="space-y-2">
            {showFilterDropdown && filtersOpen && (
                <div className="bg-white border border-slate-200 rounded-lg mb-1">
                    <AdvancedSearch open={true} onSearch={handleAdvancedSearch} />
                </div>
            )}

            <ActualTable
                title={title}
                search={search}
                setSearch={setSearch}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                data={data}
                isLoading={isLoading}
                error={error}
                onDelete={handleDelete}
                onExportExcel={handleExportExcel}
                onAdd={handleAdd}
                onSettings={handleSettings}
                onFilter={handleFilter}
                onRefresh={refetch}
            />

            <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
            <AddFlightModal
                open={addOpen}
                onClose={() => setAddOpen(false)}
                directionType={baseParams.directionType === 'Arrival' ? 'Arrival' : 'Departure'}
                flightCategory={
                    baseParams.flightCategory === 'International' ? 'International' : 'Domestic'
                }
                onSubmit={(data) => console.log('submit new flight', title, data)}
            />
        </div>
    )
}

const CurrentDomestic = () => {
    return (
        <div className="p-3 space-y-4">
            <DomesticSection
                title="Domestic - Arrival"
                baseParams={{ flightCategory: 'Domestic', directionType: 'Arrival' }}
                showFilterDropdown={true}
            />
            <DomesticSection
                title="Domestic - Departure"
                baseParams={{ flightCategory: 'Domestic', directionType: 'Departure' }}
                showFilterDropdown={false}
            />
        </div>
    )
}

export default CurrentDomestic
