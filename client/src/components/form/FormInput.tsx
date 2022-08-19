import React from 'react'

const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ children, ...other }) => {
    return (
        <label>
            <input
                {...other}
                className="appearance-none relative block w-full z-[1] px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            {children}
        </label>
    )
}

export default React.memo(FormInput)