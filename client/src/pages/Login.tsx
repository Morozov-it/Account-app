import React, { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useActions } from '../store/store'
import { login } from '../store/common.api'
import { Routes, STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '../constants'
import { Alert, Checkbox, FormButton, FormInput, FormTitle, LayoutPage } from '../components'

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const ref = useRef<HTMLInputElement>(null)

    const { setUser } = useActions()
    const navigate = useNavigate()

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }, [])
    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loading) {
            setError('')
            setLoading(true)
            try {
                const payload = await login({ email, password })
                setUser(payload.data.user)
                localStorage.setItem(STORAGE_TOKEN_KEY, payload.data.accessToken)
                ref.current?.checked && localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(payload.data.user))
                navigate(Routes.contacts)
            } catch (e) {
                setError((e as AxiosError)?.response?.data as string)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <LayoutPage title='Login'>
            <div className="max-w-md w-full mx-auto px-2">
                <FormTitle
                    title='Log in to your account'
                    linkText='register to a new account'
                    linkUrl={Routes.register}
                />
                <form onSubmit={onSubmit} autoComplete='off' className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-1 flex flex-col gap-3">
                        <FormInput
                            value={email}
                            onChange={onEmailChange}
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                        />
                        <FormInput
                            value={password}
                            onChange={onPasswordChange}
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                        />
                    </div>
                    <Checkbox
                        ref={ref}
                        name='remember-me'
                        defaultChecked
                    >
                        remember me
                    </Checkbox>
                    
                    {error && <Alert color='red' text={error} onClose={() => setError('')} />}
                    <FormButton
                        text='Log in'
                        loading={loading}
                        lock={!email || !password}
                    />
                </form>
            </div>
        </LayoutPage>
    )
}

export default Login