import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import { Routes } from "../constants"

const Contacts = lazy(() => import('../pages/Contacts'))
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Settings = lazy(() => import('../pages/Settings'))

interface Route {
    path: string
    element: JSX.Element
}

export const authRoutes: Route[] = [
    {
        path: Routes.contacts,
        element: <Contacts />,
    },
    {
        path: Routes.settings,
        element: <Settings />,
    }
]

export const publicRoutes: Route[] = [
    {
        path: Routes.home,
        element: <Home />,
    },
    {
        path: Routes.login,
        element: <Login />,
    },
    {
        path: Routes.register,
        element: <Register />,
    },
    {
        path: Routes.notFound,
        element: <Navigate to={Routes.login} replace />,
    },
]