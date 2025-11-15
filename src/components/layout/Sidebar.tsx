import { Link, useLocation } from "react-router-dom"

const menuItems = [
    { path: "/", name: "Dashboard", icon: "📊" },
    { path: "/current", name: "Current", icon: "✈️" },
    { path: "/schedule", name: "Schedule", icon: "📅" },
    { path: "/directory", name: "Directory", icon: "📁" },
    { path: "/enterprise", name: "Enterprise", icon: "🏢" },
    { path: "/logs", name: "Logs", icon: "📋" },
    { path: "/reports", name: "Reports", icon: "📈" },
]

const Sidebar = () => {
    const location = useLocation()

    return (
        <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col">
            <div className="p-6 border-b border-blue-700">
                <h1 className="text-2xl font-bold">IranAir Portal</h1>
                <p className="text-blue-200 text-sm mt-1">Airport Management System</p>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-blue-700 text-white shadow-lg'
                                            : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                                        }`}
                                >
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-blue-700">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">AI</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-blue-200">Administrator</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
