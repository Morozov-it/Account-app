import React, { useCallback, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoUrl, Routes, STORAGE_TOKEN_KEY } from '../constants'
import { LockClosedIcon} from '@heroicons/react/outline'
import Checkbox from './Checkbox'
import FormInput from './FormInput'
import FormButton from './FormButton'
import SpinnerBtn from './SpinnerBtn'
import { useActions } from '../store/store'
import Alert from './Alert'
import { login } from '../store/common.api'

const LoginForm: React.FC = () => {
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
            setLoading(true)
            try {
                const payload = await login({ email, password })
                setUser(payload.data.user)
                ref.current?.checked && localStorage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(payload.data))
                navigate(Routes.contacts)
            } catch (e) {
                console.log(e)
                setError('')
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="max-w-md w-full mx-auto px-2">
            <div>
                <img
                    className="mx-auto h-12 w-auto"
                    src={logoUrl}
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900 dark:text-slate-100">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    {'or '}
                    <Link to={Routes.register} className="font-medium text-indigo-600 hover:text-indigo-500">
                        register to a new account
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
                <Checkbox
                    ref={ref}
                    name='remember-me'
                    defaultChecked
                >
                    remember me
                </Checkbox>
                {error && <Alert color='red' text={error} onClose={() => setError('')} />}
                <FormButton type='submit'>
                    {loading
                        ?<SpinnerBtn />
                        :<>
                            {(!email || !password) && <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                            </span>}
                            <span>Sign in</span>
                        </>
                    }
                </FormButton>
            </form>
        </div>
    )
}

export default LoginForm