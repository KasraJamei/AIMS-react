// src/router/index.tsx

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
// import Current from "../pages/Current"
// import Schedule from "../pages/Schedule"
// import Directory from "../pages/Directory"
// import Enterprise from "../pages/Enterprise"
// import Logs from "../pages/Logs"
// import Reports from "../pages/Reports"
import App from "../App"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            // { path: "current", element: <Current /> },
            // { path: "schedule", element: <Schedule /> },
            // { path: "directory", element: <Directory /> },
            // { path: "enterprise", element: <Enterprise /> },
            // { path: "logs", element: <Logs /> },
            // { path: "reports", element: <Reports /> },
        ],
    },
])

export const AppRouter = () => <RouterProvider router={router} />
