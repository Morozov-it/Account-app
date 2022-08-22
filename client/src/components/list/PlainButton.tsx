import React from 'react'

const PlainButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...other }) => {
    return (
        <button
            {...other}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 dark:hover:bg-slate-500 focus:outline-none"
        >
            {children}
        </button>
    )
}

export default React.memo(PlainButton)