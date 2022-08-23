import React, { useCallback } from 'react'
import LayoutPage from '../components/LayoutPage'
import { ContactItem, List } from '../components/contacts'
import Pagination from '../components/Pagination'
import { Contact } from '../models'
import { useFetchContactsQuery } from '../store/contacts/contacts.api'
import { useActions, useAppSelector } from '../store/store'
import { getFetchParams } from '../utils/getFetchParams'

const Contacts: React.FC = () => {
    const userId = useAppSelector((state) => state.user.id)
    const { _page, _limit, _sort, _order, q, filter, totalCount } = useAppSelector((state) => state.contacts)
    const { changePage, incrementPage, decrementPage } = useActions()
    const { data: contacts, isLoading, isSuccess, isError, error } = useFetchContactsQuery(
        getFetchParams({ _page, _limit, _sort, _order, q }, { userId, ...filter })
    )
    
    const render = useCallback((item: Contact) => (
        <ContactItem key={item.id} {...item} />
    ), [])

    return (
        <LayoutPage title='Contacts'>
            <div className="max-w-7xl w-full mx-auto px-2 h-full flex flex-col gap-2">
                <List<Contact>
                    data={contacts}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    isError={isError}
                    error={error}
                    render={render}
                />
                <Pagination
                    page={_page}
                    limit={_limit}
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