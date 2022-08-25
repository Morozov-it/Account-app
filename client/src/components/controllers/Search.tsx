import React, { useEffect } from 'react'
import { useActions, useAppSelector } from '../../store/store'
import Input from './Input'

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
        <Input
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            type='text'
            placeholder='search...'
            className='flex-grow'
        />
    )
}

export default React.memo(Search)