// src/pages/CurrentDomestic.tsx

import { useState } from 'react'
import { useActuals, useDeleteActual } from '../hooks/useActuals'
import { actualService } from '../api/services/actual.service'
import { ActualTable } from '../components/flights/ActualTable'
import type { ActualSearchParams } from '../api/types/actual.types'

const PAGE_SIZE = 20

const DomesticSection = ({
    title,
    baseParams,
}: {
    title: string
    baseParams: ActualSearchParams
}) => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

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
        } catch (e) {
            console.error('Export excel failed', e)
            alert('Export excel failed')
        }
    }

    const handleAdd = () => console.log('ADD flight', title)
    const handleSettings = () => console.log('OPEN settings', title)
    const handleFilter = () => console.log('OPEN filter', title)

    return (
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
    )
}

const CurrentDomestic = () => {
    return (
        <div className="p-3 space-y-4">
            <DomesticSection
                title="Domestic - Arrival"
                baseParams={{ flightCategory: 'Domestic', directionType: 'Arrival' }}
            />
            <DomesticSection
                title="Domestic - Departure"
                baseParams={{ flightCategory: 'Domestic', directionType: 'Departure' }}
            />
        </div>
    )
}

export default CurrentDomestic
