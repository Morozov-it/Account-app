import React from 'react'
import { classNames } from '../../utils/classNames'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...other }) => {
    const styles = classNames(
        'flex items-center justify-center gap-1 px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 dark:hover:bg-gray-500 hover:bg-gray-100 active:bg-gray-300 dark:active:bg-gray-600 focus:outline-none',
        className ?? ''
    )

    return (
        <button
            {...other}
            className={styles}
        >
            {children}
        </button>
    )
}

export default React.memo(Button)