import React from 'react'
import { classNames } from '../../utils/classNames'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, children, ...other }) => {
    const styles = classNames(
        'appearance-none block px-3 py-1 border border-gray-300 placeholder-gray-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
        className ?? ''
    )

    return (
        <input
            {...other}
            className={styles}
        />
    )
}

export default React.memo(Input)