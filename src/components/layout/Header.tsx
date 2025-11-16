// src/components/layout/Header.tsx

import { useState, useRef, useEffect } from 'react'

interface HeaderProps {
    onToggleSidebar: () => void
    isSidebarOpen?: boolean
}

const Header = ({ onToggleSidebar, isSidebarOpen }: HeaderProps) => {
    const [showAbout, setShowAbout] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const aboutRef = useRef<HTMLDivElement>(null)

    const handleCloseAbout = () => {
        setIsClosing(true)
        setTimeout(() => {
            setShowAbout(false)
            setIsClosing(false)
        }, 300)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
                handleCloseAbout()
            }
        }

        if (showAbout) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showAbout])

    return (
        <>
            <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 lg:py-4 sticky top-0 z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={onToggleSidebar}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group cursor-pointer"
                            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                        >
                            <svg
                                className="w-6 h-6 transition-transform group-hover:scale-110"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative" ref={aboutRef}>
                            <button
                                onClick={() => setShowAbout(!showAbout)}
                                className={`p-2 rounded-lg transition-all duration-200 relative cursor-pointer ${showAbout
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                                aria-label="About"
                            >
                                <svg
                                    className={`w-6 h-6 transition-transform duration-300 ${showAbout ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                            {/* Desktop Dropdown */}
                            <div
                                className={`hidden sm:block absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 transition-all duration-300 ease-in-out origin-top-right ${showAbout && !isClosing
                                        ? 'opacity-100 scale-100 translate-y-0'
                                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                    }`}
                            >
                                <div className="bg-linear-to-rrom-blue-600 to-blue-700 px-6 py-4 border-b border-blue-800">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white">About AIMS</h3>
                                        <button
                                            onClick={handleCloseAbout}
                                            className="text-white hover:text-gray-200 transition-all hover:rotate-90 duration-200 cursor-pointer"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start space-x-4 mb-6">
                                        <div className="shrink-0">
                                            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="mb-4">
                                                <h4 className="text-xl font-bold text-gray-900 mb-1">AIMS</h4>
                                                <p className="text-sm text-gray-600 font-medium">Airport Information Management System</p>
                                            </div>

                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center">
                                                    <span className="text-gray-500 w-20">Version:</span>
                                                    <span className="text-gray-900 font-medium">3.3.10.0</span>
                                                </div>
                                                <div className="flex items-start">
                                                    <span className="text-gray-500 w-20 shrink-0">Copyright:</span>
                                                    <span className="text-gray-900">(c) 2022 partodadeh Co.</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-gray-500 w-20">Rights:</span>
                                                    <span className="text-gray-900">All rights reserved</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">Partodadeh</h5>
                                        <p className="text-xs text-gray-600 mb-2">Intelligent System Design</p>
                                        <a
                                            href="https://www.partodadeh.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-600 hover:text-blue-700 hover:underline transition-colors cursor-pointer"
                                        >
                                            www.partodadeh.com
                                        </a>
                                    </div>

                                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <p className="text-xs text-gray-700 leading-relaxed">
                                            <span className="font-semibold text-yellow-800">Warning:</span> This computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution of this program, or any portion of it, maximum extent possible under the law.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative cursor-pointer">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
                        </button>

                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block cursor-pointer">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>

                        <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all">
                                <span className="text-white font-semibold text-sm">JD</span>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                            <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors hidden sm:block cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Modal - No Dark Overlay, Smooth Close */}
            {showAbout && (
                <div
                    className="sm:hidden fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
                    onClick={handleCloseAbout}
                >
                    <div
                        className={`bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-sm transform transition-all duration-300 ease-in-out ${isClosing
                                ? 'scale-95 opacity-0 -translate-y-2'
                                : 'scale-100 opacity-100 translate-y-0'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-linear-to-r from-blue-600 to-blue-700 px-5 py-3 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-bold text-white">About AIMS</h3>
                                <button
                                    onClick={handleCloseAbout}
                                    className="text-white hover:text-gray-200 transition-all hover:rotate-90 duration-200 cursor-pointer p-1"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-5 max-h-[60vh] overflow-y-auto">
                            <div className="flex items-start space-x-3 mb-4">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="mb-3">
                                        <h4 className="text-lg font-bold text-gray-900 mb-0.5">AIMS</h4>
                                        <p className="text-xs text-gray-600 font-medium">Airport Information Management System</p>
                                    </div>

                                    <div className="space-y-1.5 text-xs">
                                        <div className="flex items-center">
                                            <span className="text-gray-500 w-16">Version:</span>
                                            <span className="text-gray-900 font-medium">3.3.10.0</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="text-gray-500 w-16 shrink-0">Copyright:</span>
                                            <span className="text-gray-900">(c) 2022 partodadeh Co.</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-gray-500 w-16">Rights:</span>
                                            <span className="text-gray-900">All rights reserved</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-3 mb-3">
                                <h5 className="font-semibold text-gray-900 mb-1 text-xs">Partodadeh</h5>
                                <p className="text-xs text-gray-600 mb-1.5">Intelligent System Design</p>
                                <a
                                    href="https://www.partodadeh.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline transition-colors cursor-pointer"
                                >
                                    www.partodadeh.com
                                </a>
                            </div>

                            <div className="p-2.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-xs text-gray-700 leading-relaxed">
                                    <span className="font-semibold text-yellow-800">Warning:</span> This computer program is protected by copyright law and international treaties. Unauthorized reproduction or distribution of this program, or any portion of it, maximum extent possible under the law.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
