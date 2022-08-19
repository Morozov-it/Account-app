import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Routes, STORAGE_TOKEN_KEY, navigation, logoUrl } from '../constants'
import { useActions, useAppSelector } from '../store/store'
import { classNames } from '../utils/classNames'
import { Disclosure, Menu } from '@headlessui/react'
import { MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline'
import ToggleTheme from './ToggleTheme'

const Navbar: React.FC = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    
    const { name, email, isAuth } = useAppSelector((state) => state.user)
    const { logout } = useActions()

    const onLogout = () => {
        localStorage.removeItem(STORAGE_TOKEN_KEY)
        logout()
        navigate(Routes.login)
    }
    const onSettings = () => navigate(Routes.settings)
    const onLogin = () => navigate(Routes.login)

    return (
        <Disclosure as="nav" className="bg-gray-800 w-full h-16 fixed">
        {({ open }) => (
            <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-8"
                                src={logoUrl}
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className={classNames(
                                            pathname === item.to
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'px-3 py-2 rounded-md text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <ToggleTheme />
                    <div className="hidden md:block">
                        <Menu as="div" className="ml-3 relative transition-all">
                            <div>
                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full text-gray-400 hover:text-white flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <UserIcon className="h-8 w-8 rounded-full" />
                                </Menu.Button>
                            </div>
                                <Menu.Items className="origin-top-right text-center absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {isAuth
                                        ?<>
                                            <Menu.Item>
                                                <div className='px-4 py-1 font-bold shadow-sm overflow-x-hidden text-gray-700'>
                                                    {name}
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <div
                                                    onClick={onSettings}
                                                    className='hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                >
                                                    Settings
                                                </div>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <div
                                                    onClick={onLogout}
                                                    className='hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                >
                                                    Sign out
                                                </div>
                                            </Menu.Item>
                                        </>
                                        :<Menu.Item>
                                            <div
                                                onClick={onLogin}
                                                className='hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                            >
                                                Log in
                                            </div>
                                        </Menu.Item>
                                    }
                            </Menu.Items>
                        </Menu>
                    </div>
                    <div className="-mr-2 ml-3 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            {open 
                                ? <XIcon className="block h-6 w-6" />
                                : <MenuIcon className="block h-6 w-6" />
                            }
                        </Disclosure.Button>
                    </div>
                </div>
            </div>
            {/* Mobile menu*/}
            <Disclosure.Panel className="md:hidden bg-[rgba(31,41,55,0.95)] w-full relative z-[10]">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navigation.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            onClick={() => navigate(item.to)}
                            className={classNames(
                                pathname === item.to ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white ',
                                'block px-3 py-2 rounded-md text-base font-medium w-full'
                            )}
                        >
                        {item.name}
                    </Disclosure.Button>
                ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center justify-center px-5">
                        <UserIcon className="h-8 w-8 rounded-full stroke-gray-400" />
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">{name}</div>
                            <div className="text-sm font-medium leading-none text-gray-400">{email}</div>
                        </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        {isAuth
                            ?<Disclosure.Button
                                onClick={onLogout}
                                className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                                Sign out
                            </Disclosure.Button>
                            :<Disclosure.Button
                                onClick={onLogin}
                                className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                                Log in
                            </Disclosure.Button>
                        }
                    </div>
                </div>
            </Disclosure.Panel>
        </>
        )}
        </Disclosure>
    )
}

export default Navbar