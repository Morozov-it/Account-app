import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoUrl, Routes } from '../constants'
import { LockClosedIcon} from '@heroicons/react/outline'
import FormInput from './FormInput'
import FormButton from './FormButton'
import { useRegisterMutation } from '../store/user/user.api'
import SpinnerBtn from './SpinnerBtn'
import { ErrorType } from '../models'
import Alert from './Alert'

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(true)

    const [register, { isLoading, error, isSuccess }] = useRegisterMutation()
    const navigate = useNavigate()

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }, [])
    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [])
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLoading) {
            try {
                const payload = await register({ email, password }).unwrap()
                setTimeout(() => {
                    navigate(Routes.login)
                }, 3000)
            } catch {
                setAlert(true)
            }
        }
    }
    console.log(isSuccess)

    return (
        <div className="max-w-md w-full mx-auto px-2">
            <div>
                <img
                    className="mx-auto h-12 w-auto"
                    src={logoUrl}
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900 dark:text-slate-100">
                    Sign up for a new account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {'or '}
                    <Link to={Routes.login} className="font-medium text-indigo-600 hover:text-indigo-500">
                        login in to your account
                    </Link>
                </p>
            </div>
            <form onSubmit={onSubmit} autoComplete='off' className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-1 flex flex-col gap-2">
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

                {(error && alert) && <Alert color='red' text={(error as ErrorType)?.data} onClose={() => setAlert(false)} />}
                <FormButton type='submit'>
                    {isLoading
                        ?<SpinnerBtn />
                        :<>
                            {(!email || !password) && <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                            </span>}
                            <span>Sign up</span>
                        </>
                    }
                </FormButton>
            </form>
        </div>
    )
}

export default RegisterForm