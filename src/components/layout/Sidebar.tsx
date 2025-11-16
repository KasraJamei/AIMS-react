// src/components/layout/Sidebar.tsx

import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from "react-router-dom"

interface SubMenuItem {
    path: string
    name: string
}

interface MenuItem {
    path: string
    name: string
    icon: string
    subItems?: SubMenuItem[]
}

const menuItems: MenuItem[] = [
    { path: "/", name: "Dashboard", icon: "📊" },
    {
        path: "/current",
        name: "Current",
        icon: "✈️",
        subItems: [
            { path: "/current/domestic", name: "Domestic" },
            { path: "/current/international", name: "International" },
            { path: "/current/announce", name: "Announce" }
        ]
    },
    {
        path: "/schedule",
        name: "Schedule",
        icon: "📅",
        subItems: [
            { path: "/schedule/domestic", name: "Domestic" },
            { path: "/schedule/international", name: "International" }
        ]
    },
    {
        path: "/directory",
        name: "Directory",
        icon: "📁",
        subItems: [
            { path: "/directory/groups", name: "Groups" },
            { path: "/directory/users", name: "Users" },
            { path: "/directory/sessions", name: "Sessions" }
        ]
    },
    {
        path: "/enterprise",
        name: "Enterprise",
        icon: "🏢",
        subItems: [
            { path: "/enterprise/devices", name: "Devices" },
            { path: "/enterprise/advertisements", name: "Advertisements" },
            { path: "/enterprise/playlist", name: "PlayList" },
            { path: "/enterprise/definitions", name: "Definitions" },
            { path: "/enterprise/settings", name: "Settings" }
        ]
    },
    {
        path: "/logs",
        name: "Logs",
        icon: "📋",
        subItems: [
            { path: "/logs/all", name: "All Logs" }
        ]
    },
    {
        path: "/reports",
        name: "Reports",
        icon: "📈",
        subItems: [
            { path: "/reports/flight", name: "Flight" },
            { path: "/reports/resource", name: "Resource" }
        ]
    },
]

interface SidebarProps {
    isOpen: boolean
    showText: boolean
    onClose: () => void
}

const Sidebar = ({ isOpen, showText, onClose }: SidebarProps) => {
    const location = useLocation()
    const [isMobile, setIsMobile] = useState(false)
    const [userOpenedDropdowns, setUserOpenedDropdowns] = useState<string[]>([])

    const activeParentPath = useMemo(() => {
        const activeParent = menuItems.find(item =>
            item.subItems?.some(sub => location.pathname.startsWith(sub.path))
        )
        return activeParent?.path
    }, [location.pathname])

    const openDropdowns = useMemo(() => {
        const dropdowns = [...userOpenedDropdowns]
        if (activeParentPath && !dropdowns.includes(activeParentPath)) {
            dropdowns.push(activeParentPath)
        }
        return dropdowns
    }, [userOpenedDropdowns, activeParentPath])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleLinkClick = () => {
        if (isMobile && isOpen) {
            onClose()
        }
    }

    const toggleDropdown = (path: string) => {
        setUserOpenedDropdowns(prev =>
            prev.includes(path)
                ? prev.filter(p => p !== path)
                : [...prev, path]
        )
    }

    const getSidebarClasses = () => {
        const baseClasses = "bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col transition-all duration-300 ease-in-out z-40"

        if (isMobile) {
            return `${baseClasses} fixed inset-y-0 left-0 w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
        } else if (!showText) {
            return `${baseClasses} w-20`
        } else {
            return `${baseClasses} w-64`
        }
    }

    const getMenuItemClasses = (itemPath: string, isSubItem: boolean = false) => {
        const isActive = location.pathname === itemPath || location.pathname.startsWith(itemPath + '/')
        const baseClasses = `flex items-center p-3 rounded-lg transition-all duration-200 group cursor-pointer ${isSubItem ? 'pl-11' : ''}`

        if (isMobile || showText) {
            return `${baseClasses} ${isActive
                    ? 'bg-blue-700 text-white shadow-lg'
                    : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                }`
        } else {
            return `${baseClasses} justify-center ${isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-200 hover:bg-blue-700'
                }`
        }
    }

    const shouldShowFullHeader = (isMobile && isOpen) || (!isMobile && showText)
    const shouldShowIconsOnlyHeader = !isMobile && !showText && !isOpen

    return (
        <>
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-transparent z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={getSidebarClasses()}>
                {shouldShowFullHeader && (
                    <div className="p-6 border-b border-blue-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-lg font-bold">IA</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">IranAir Portal</h1>
                                <p className="text-blue-200 text-xs mt-0.5 opacity-90">Airport Management</p>
                            </div>
                        </div>
                    </div>
                )}

                {shouldShowIconsOnlyHeader && (
                    <div className="p-6 border-b border-blue-700 flex justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold">IA</span>
                        </div>
                    </div>
                )}

                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path
                            const hasSubItems = item.subItems && item.subItems.length > 0
                            const isDropdownOpen = openDropdowns.includes(item.path)
                            const isParentActive = item.subItems?.some(sub =>
                                location.pathname.startsWith(sub.path)
                            )

                            return (
                                <li key={item.name}>
                                    {hasSubItems ? (
                                        <>
                                            <div
                                                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 group cursor-pointer ${isParentActive || isActive
                                                        ? 'bg-blue-700 text-white shadow-lg'
                                                        : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                                                    }`}
                                                onClick={() => toggleDropdown(item.path)}
                                            >
                                                <div className="flex items-center">
                                                    <span className={`text-lg transition-transform group-hover:scale-110 ${(isMobile || showText) ? 'mr-3' : 'mx-auto'
                                                        }`}>
                                                        {item.icon}
                                                    </span>
                                                    {(isMobile || showText) && (
                                                        <span className="font-medium whitespace-nowrap">
                                                            {item.name}
                                                        </span>
                                                    )}
                                                </div>
                                                {(isMobile || showText) && (
                                                    <svg
                                                        className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180' : 'rotate-0'
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                )}
                                            </div>

                                            {(isMobile || showText) && (
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen
                                                            ? 'max-h-96 opacity-100 mt-1'
                                                            : 'max-h-0 opacity-0 mt-0'
                                                        }`}
                                                >
                                                    <ul className="space-y-1">
                                                        {item.subItems?.map((subItem, index) => (
                                                            <li
                                                                key={subItem.name}
                                                                className={`transition-all duration-300 ease-in-out ${isDropdownOpen
                                                                        ? 'translate-x-0 opacity-100'
                                                                        : '-translate-x-2 opacity-0'
                                                                    }`}
                                                                style={{
                                                                    transitionDelay: isDropdownOpen ? `${index * 50}ms` : '0ms'
                                                                }}
                                                            >
                                                                <Link
                                                                    to={subItem.path}
                                                                    className={getMenuItemClasses(subItem.path, true)}
                                                                    onClick={handleLinkClick}
                                                                >
                                                                    <span className="text-sm font-medium whitespace-nowrap">
                                                                        {subItem.name}
                                                                    </span>
                                                                    {location.pathname === subItem.path && (
                                                                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                                                                    )}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className={getMenuItemClasses(item.path)}
                                            onClick={handleLinkClick}
                                        >
                                            <span className={`text-lg transition-transform group-hover:scale-110 ${(isMobile || showText) ? 'mr-3' : 'mx-auto'
                                                }`}>
                                                {item.icon}
                                            </span>
                                            {(isMobile || showText) && (
                                                <span className="font-medium whitespace-nowrap">
                                                    {item.name}
                                                </span>
                                            )}
                                            {isActive && showText && !isMobile && (
                                                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {shouldShowFullHeader && (
                    <div className="p-4 border-t border-blue-700">
                        <div className="flex items-center space-x-3 cursor-pointer hover:bg-blue-700 rounded-lg p-2 transition-colors">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                <span className="text-xs font-semibold">AI</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">Admin User</p>
                                <p className="text-xs text-blue-200 truncate">Administrator</p>
                            </div>
                            <svg
                                className="w-4 h-4 text-blue-300 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                )}

                {shouldShowIconsOnlyHeader && (
                    <div className="p-4 border-t border-blue-700 flex justify-center">
                        <div className="cursor-pointer hover:bg-blue-700 rounded-lg p-2 transition-colors">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold">AI</span>
                            </div>
                        </div>
                    </div>
                )}
            </aside>
        </>
    )
}

export default Sidebar
