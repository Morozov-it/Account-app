import React from 'react'
import LayoutPage from '../components/LayoutPage'
import RegisterForm from '../components/RegisterForm'

const Register: React.FC = () => {
    return (
        <LayoutPage title='Login'>
            <RegisterForm />
        </LayoutPage>
    )
}

export default Register