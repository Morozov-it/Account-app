import React, { useEffect, useState } from 'react'

interface Props {
    onSearch: (q: string) => void
}

const Search: React.FC<Props> = ({ onSearch }) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        const id = setTimeout(() => {
            onSearch(value)
        }, 500)
        return () => {
            clearTimeout(id)
        }
    }, [value, onSearch])

    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type='text'
            placeholder='search...'
            className="appearance-none relative block px-3 py-1 border border-gray-300 placeholder-gray-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
    )
}

export default React.memo(Search)