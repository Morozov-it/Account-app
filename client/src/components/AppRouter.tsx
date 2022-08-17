import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { useAppSelector } from '../store/store'

const AppRouter = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth)

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {publicRoutes.map((route) =>
                    <Route key={route.path} {...route} />
                )}
                {isAuth && authRoutes.map((route) =>
                    <Route key={route.path} {...route} />
                )}
            </Routes>
        </Suspense>
    )
}

export default AppRouter