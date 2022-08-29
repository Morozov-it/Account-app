import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../../utils/routes'
import { useAppSelector } from '../../store/store'
import Spinner from '../shared/Spinner'

const AppRouter: React.FC = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth)

    return (
        <Suspense fallback={<Spinner />}>
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