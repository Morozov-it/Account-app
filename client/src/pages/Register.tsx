import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/outline'
import { AxiosError } from 'axios'
import LayoutPage from '../components/LayoutPage'
import Alert from '../components/Alert'
import { register } from '../store/common.api'
import { Routes } from '../constants'
import { FormButton, FormInput, FormTitle } from '../components/form'
import { SpinnerInBtn } from '../components/controllers'

const Register: React.FC = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const timer = useRef<number | null>(null)
    const navigate = useNavigate()

    const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])
    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }, [])
    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [])
    const cancelNavigate = useCallback(() => {
        setSuccess('')
        timer.current && clearTimeout(timer.current)
    }, [])

    useEffect(() => {
        return () => cancelNavigate()
    }, [cancelNavigate])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loading) {
            setError('')
            setLoading(true)
            try {
                const payload = await register({ name, email, password })
                setSuccess(`
                    You have registered new user with email: ${payload.data.user.email}.
                    To cancel the transition to the login page, please close this alert!
                `)
                const id = setTimeout(() => navigate(Routes.login), 8000) as unknown as number
                timer.current = id
            } catch (e) {
                setError((e as AxiosError)?.response?.data as string)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <LayoutPage title='Register'>
            <div className="max-w-md w-full mx-auto px-2">
                <FormTitle
                    title='Sign up for a new account'
                    linkText='log in to your account'
                    linkUrl={Routes.login}
                />
                <form onSubmit={onSubmit} autoComplete='off' className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-1 flex flex-col gap-3">
                        <FormInput
                            value={name}
                            onChange={onNameChange}
                            name="name"
                            type="name"
                            required
                            placeholder="Name"
                        />
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
                            minLength={6}
                            placeholder="Password"
                        />
                    </div>
                    {success && <Alert color='green' text={success} onClose={cancelNavigate} />}
                    {error && <Alert color='red' text={error} onClose={() => setError('')} />}
                    <FormButton type='submit' className='text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'>
                        {loading
                            ?<SpinnerInBtn displayText/>
                            :<>
                                {(!email || !password || !name) && <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                                </span>}
                                <span>Sign up</span>
                            </>
                        }
                    </FormButton>
                </form>
            </div>
        </LayoutPage>
    )
}

export default Register