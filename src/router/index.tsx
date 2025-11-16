import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import CurrentDomestic from '../pages/CurrentDomestic'
import CurrentInternational from '../pages/CurrentInternational'
import CurrentAnnounce from '../pages/CurrentAnnounce'
import { ProtectedRoute } from '../components/ProtectedRoute'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            {
                path: 'current',
                children: [
                    { index: true, element: <Navigate to="/current/domestic" replace /> },
                    { path: 'domestic', element: <CurrentDomestic /> },
                    { path: 'international', element: <CurrentInternational /> },
                    { path: 'announce', element: <CurrentAnnounce /> },
                ],
            },
        ],
    },
])

export const AppRouter = () => <RouterProvider router={router} />
