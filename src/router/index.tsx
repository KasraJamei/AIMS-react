// src/router/index.tsx

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import App from "../App"
import Dashboard from "../pages/Dashboard"
import CurrentDomestic from "../pages/CurrentDomestic"
import CurrentInternational from "../pages/CurrentInternational"
import CurrentAnnounce from "../pages/CurrentAnnounce"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "current",
                children: [
                    {
                        index: true,
                        element: <Navigate to="/current/domestic" replace />,
                    },
                    {
                        path: "domestic",
                        element: <CurrentDomestic />,
                    },
                    {
                        path: "international",
                        element: <CurrentInternational />,
                    },
                    {
                        path: "announce",
                        element: <CurrentAnnounce />,
                    },
                ],
            },
            // all other sections disabled for now
            // { path: "schedule", element: <Schedule /> },
            // { path: "directory", element: <Directory /> },
            // { path: "enterprise", element: <Enterprise /> },
            // { path: "logs", element: <Logs /> },
            // { path: "reports", element: <Reports /> },
        ],
    },
])

export const AppRouter = () => <RouterProvider router={router} />
