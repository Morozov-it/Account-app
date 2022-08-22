import React from 'react'
import LayoutPage from '../components/LayoutPage'
import { ContactList } from '../components/list'
import Pagination from '../components/Pagination'
import { useActions, useAppSelector } from '../store/store'

const Contacts: React.FC = () => {
    const { page, limit, totalCount, filter, order, search, sort } = useAppSelector((state) => state.contacts)
    const { changePage, incrementPage, decrementPage } = useActions()

    return (
        <LayoutPage title='Contacts'>
            <div className="max-w-7xl w-full mx-auto px-2">
                <ContactList />
                <Pagination
                    page={page}
                    limit={limit}
                    totalCount={totalCount}
                    onChange={changePage}
                    increment={incrementPage}
                    decrement={decrementPage}
                />
            </div>
        </LayoutPage>
    )
}

export default Contacts