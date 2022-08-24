import React from 'react'

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ children, ...other }, ref) => {
    return (
        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900 flex items-center gap-2">
            <input
                ref={ref}
                type="checkbox"
                {...other}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded active:outline-none focus:outline-none"
            />
            <span>{children}</span>
        </label>
    )
})

export default React.memo(Checkbox)