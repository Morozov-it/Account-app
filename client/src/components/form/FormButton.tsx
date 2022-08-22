import React from 'react'
import { classNames } from '../../utils/classNames'

const FormButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...other }) => {
    const styles = classNames(
        'group relative w-full flex items-center justify-center py-2 px-4 text-sm font-medium rounded-md focus:outline-none',
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

export default React.memo(FormButton)