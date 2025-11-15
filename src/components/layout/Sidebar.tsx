import { Link } from "react-router-dom";

// می‌تونی آیکون‌ها رو به صورت svg وارد کنی
// import DashboardIcon from '../../assets/icons/dashboard.svg';

const Sidebar = () => {
    const menuItems = [
        { path: "/", name: "Dashboard" },
        { path: "/current", name: "Current" },
        { path: "/schedule", name: "Schedule" },
        { path: "/directory", name: "Directory" },
        { path: "/enterprise", name: "Enterprise" },
        { path: "/logs", name: "Logs" },
        { path: "/reports", name: "Reports" },
    ];

    return (
        <aside className="w-64 bg-blue-800 text-white p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold">Iranian Airport Compa</h1>
            </div>
            <nav>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name} className="mb-4">
                            <Link to={item.path} className="flex items-center p-2 hover:bg-blue-700 rounded">
                                {/* <img src={DashboardIcon} alt="" className="w-5 h-5 mr-3" /> */}
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
