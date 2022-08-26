import React from 'react'

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ children, ...other }) => {
    return (
        <textarea
            {...other}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-white dark:bg-slate-700
            text-gray-800 sm:text-sm dark:text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
    )
}

export default React.memo(Textarea)