// src/api/types/actual.types.ts

export interface CodeSharingInfo {
    master?: string
    flightNo?: string
}

export interface ActualFlight {
    id: number
    blink?: string
    airlineCode?: string
    airlineName?: string
    terminalCode?: string
    dayOfWeek?: string
    faDate?: string
    enDate?: string
    flightNumber?: string
    stm?: string
    ata?: string
    atd?: string
    etm?: string
    delay?: number
    aircraftCode?: string
    logo?: string
    origin?: string
    destination?: string
    statusCode?: string
    statusName?: string
    flightCategory?: string
    directionType?: string
    gate?: string
    counter?: string
    belt?: string
    registration?: string
    parkPosition?: string
    route?: string

    // New fields (after parkPosition)
    via?: string
    internalRemark?: string
    visibility?: string
    validity?: string
    codeSharing?: CodeSharingInfo
    scheduled?: string
    flightType?: string
    publicRemark1?: string
    publicRemark2?: string
    rotationFlight?: string
}

export interface ActualSearchParams {
    isArchived?: boolean
    airportCode?: string
    terminalCode?: string
    flightCategory?: string
    directionType?: string
    airlineCode?: string
    flightNumber?: string
    aircraftCode?: string
    fromDate?: string
    toDate?: string
    statusCode?: string
    skip?: number
    take?: number
    searchText?: string
    quickLoad?: boolean
}

export interface ActualResponse {
    data: ActualFlight[]
    total: number
}
