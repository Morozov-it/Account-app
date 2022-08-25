import React, { useEffect } from 'react'
import { useActions, useAppSelector } from '../../store/store'

interface Props {
    onSearch: (q: string) => void
}

const Search: React.FC<Props> = ({ onSearch }) => {
    const search = useAppSelector((state) => state.contacts.search)
    const { changeSearch } = useActions()

    useEffect(() => {
        const id = setTimeout(() => {
            onSearch(search)
        }, 500)
        return () => {
            clearTimeout(id)
        }
    }, [search, onSearch])

    return (
        <input
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            type='text'
            placeholder='search...'
            className="appearance-none relative w-full block px-3 py-1 border border-gray-300 placeholder-gray-500 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
    )
}

export default React.memo(Search)