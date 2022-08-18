import React from 'react'
import LoginForm from '../components/LoginForm'
import LayoutPage from '../components/LayoutPage'

const Login: React.FC = () => {
    return (
        <LayoutPage title='Login'>
            <LoginForm />
        </LayoutPage>
    )
}

export default Login