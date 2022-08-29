import React from 'react'
import { SelectType } from '../../models'

interface Props<T> {
    options: Array<SelectType<T | null>>
}

const FormSelect = <T extends string,>({children, options, ...other }: React.SelectHTMLAttributes<HTMLSelectElement> & Props<T>) => {
    return (
        <label className="block text-sm font-medium">
            {children}
            <select
                {...other}
                className="mt-1 block w-full py-2 px-3 bg-white dark:bg-slate-700 text-black dark:text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >{
                options.map((option, i) => (
                    <option key={i} value={option.name ?? ''}>{option.title}</option>
                ))
            }
            </select>
        </label>
    )
}

export default React.memo(FormSelect) as typeof FormSelect