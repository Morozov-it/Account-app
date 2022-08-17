import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Routes } from '../constants'
import { useActions, useAppSelector } from '../store/store'
import { classNames } from '../utils/classNames'
import { useTheme } from '../utils/useTheme'
import { Disclosure, Menu } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, UserIcon, SunIcon, MoonIcon } from '@heroicons/react/outline'

const navigation = [
    { name: 'Home', to: Routes.home },
    { name: 'Contacts', to: Routes.contacts },
]

const Navbar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [theme, setTheme, getSystem] = useTheme()
    const { email, isAuth } = useAppSelector((state) => state.user)
    const { logout } = useActions()

    return (
        <Disclosure as="nav" className="bg-gray-800 w-full">
        {({ open }) => (
            <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
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
                <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                        <Menu as="div" className="ml-3 relative transition-all">
                            <div>
                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full text-gray-400 hover:text-white flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                {theme === 'dark'
                                    ? <MoonIcon className="h-6 w-6" />
                                    : <SunIcon className="h-6 w-6" />
                                }
                                </Menu.Button>
                            </div>
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    <div
                                        onClick={() => setTheme('light')}
                                        className='hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                    >
                                        <SunIcon className={classNames(
                                                theme === 'light'
                                                ? 'stroke-sky-400'
                                                : 'stroke-gray-700',
                                                "h-6 w-6 inline-block mr-1")} />
                                        <span className={classNames(
                                            theme === 'light'
                                            ? 'text-sky-500'
                                            : '',
                                            'font-medium'
                                        )}
                                        >light</span>
                                    </div>
                                </Menu.Item>
                                <Menu.Item>
                                    <div
                                        onClick={() => setTheme('dark')}
                                        className='hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                    >
                                        <MoonIcon className={classNames(
                                                theme === 'dark'
                                                ? 'stroke-sky-400'
                                                : 'stroke-gray-700',
                                                "h-6 w-6 inline-block mr-1")} />
                                        <span className={classNames(
                                            theme === 'dark'
                                            ? 'text-sky-500'
                                            : '',
                                            'font-medium'
                                        )}
                                        >dark</span>
                                    </div>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative transition-all">
                            <div>
                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full text-gray-400 hover:text-white flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open user menu</span>
                                    <UserIcon className="h-8 w-8 rounded-full" />
                                </Menu.Button>
                            </div>
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {isAuth
                                    ? <Menu.Item>
                                        <div
                                            onClick={() => {
                                                logout()
                                                navigate(Routes.login)
                                            }}
                                            className='hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                        >
                                            Sign out
                                        </div>
                                    </Menu.Item>
                                    :<Menu.Item>
                                        <div
                                            onClick={() => navigate(Routes.login)}
                                            className='hover:bg-gray-100 px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                        >
                                            Log in
                                        </div>
                                    </Menu.Item>
                                }
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                    </Disclosure.Button>
                </div>
                </div>
            </div>

            <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                    <Disclosure.Button
                        key={item.name}
                        onClick={() => navigate(item.to)}
                        // TODO useLocation
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
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                    <UserIcon className="h-10 w-10 rounded-full stroke-white" />
                    </div>
                    <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">Email</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{email}</div>
                    </div>
                    <button
                    type="button"
                    className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                    {isAuth
                        ?<Disclosure.Button
                            onClick={() => {
                                logout()
                                navigate(Routes.login)
                            }}
                            className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                            Sign out
                        </Disclosure.Button>
                        :<Disclosure.Button
                            onClick={() => navigate(Routes.login)}
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