// src/pages/Dashboard.tsx

import { useState } from 'react'
import StatCard from '../components/ui/StatCard'

interface DashboardData {
    arrivals: number
    departures: number
    totalDevices: number
    counters: number
    gates: number
    belts: number
    totalFlights: number
    domestic: number
    international: number
}

const Dashboard = () => {
    const [dashboardData] = useState<DashboardData>({
        arrivals: 9,
        departures: 8,
        totalDevices: 47,
        counters: 22,
        gates: 5,
        belts: 4,
        totalFlights: 17,
        domestic: 8,
        international: 9
    })

    const flightsStats = [
        {
            title: 'Total Flights',
            value: dashboardData.totalFlights.toString(),
            icon: '🛫',
            bgColor: 'bg-blue-600',
            textColor: 'text-blue-100'
        },
        {
            title: 'Domestic',
            value: dashboardData.domestic.toString(),
            icon: '🏠',
            bgColor: 'bg-green-500',
            textColor: 'text-green-100'
        },
        {
            title: 'International',
            value: dashboardData.international.toString(),
            icon: '🌍',
            bgColor: 'bg-yellow-500',
            textColor: 'text-yellow-800'
        }
    ]

    const operationsStats = [
        {
            title: 'Arrivals',
            value: dashboardData.arrivals.toString(),
            icon: '🛬',
            bgColor: 'bg-emerald-500',
            textColor: 'text-emerald-100'
        },
        {
            title: 'Departures',
            value: dashboardData.departures.toString(),
            icon: '✈️',
            bgColor: 'bg-blue-500',
            textColor: 'text-blue-100'
        }
    ]

    const facilitiesStats = [
        {
            title: 'Total Devices',
            value: dashboardData.totalDevices.toString(),
            icon: '📱',
            bgColor: 'bg-purple-500',
            textColor: 'text-purple-100'
        },
        {
            title: 'Counters',
            value: dashboardData.counters.toString(),
            icon: '🎫',
            bgColor: 'bg-indigo-500',
            textColor: 'text-indigo-100'
        },
        {
            title: 'Gates',
            value: dashboardData.gates.toString(),
            icon: '🚪',
            bgColor: 'bg-teal-500',
            textColor: 'text-teal-100'
        },
        {
            title: 'Belts',
            value: dashboardData.belts.toString(),
            icon: '🎒',
            bgColor: 'bg-orange-500',
            textColor: 'text-orange-100'
        }
    ]

    return (
        <div className="p-6 space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Airport Operations</h1>
                <p className="text-gray-600">
                    Real-time dashboard • Updated 2 minutes ago • 08:45 AM - 04:35 PM
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Flights</h2>
                    </div>

                    <div className="space-y-4">
                        {flightsStats.map((stat, index) => (
                            <StatCard key={`flights-${index}`} {...stat} />
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Operations</h2>
                    </div>

                    <div className="space-y-4">
                        {operationsStats.map((stat, index) => (
                            <StatCard key={`operations-${index}`} {...stat} />
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Facilities</h2>
                    </div>

                    <div className="space-y-3">
                        {facilitiesStats.map((stat, index) => (
                            <StatCard key={`facilities-${index}`} {...stat} size="sm" />
                        ))}
                    </div>
                </div>

            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Flight IR123</p>
                                    <p className="text-xs text-gray-500">Landed at Gate 5</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-emerald-600">On Time</p>
                                <p className="text-xs text-gray-500">2 min ago</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Counter 12</p>
                                    <p className="text-xs text-gray-500">Check-in process started</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-blue-600">Active</p>
                                <p className="text-xs text-gray-500">5 min ago</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Belt 3</p>
                                    <p className="text-xs text-gray-500">Baggage claim active</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-purple-600">Live</p>
                                <p className="text-xs text-gray-500">Now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
