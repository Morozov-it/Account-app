import React from 'react'
import { useTheme } from '../utils/useTheme'
import { Menu } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import { classNames } from '../utils/classNames'

const ToggleTheme: React.FC = () => {
    const [theme, setTheme] = useTheme()

    return (
        <Menu as="div" className="ml-auto relative transition-all">
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
    )
}

export default React.memo(ToggleTheme)