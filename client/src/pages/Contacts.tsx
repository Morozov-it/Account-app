import React, { useCallback } from 'react'
import LayoutPage from '../components/LayoutPage'
import { ContactItem, List } from '../components/contacts'
import Pagination from '../components/Pagination'
import { Contact } from '../models'
import { useFetchContactsQuery } from '../store/contacts/contacts.api'
import { useActions, useAppSelector } from '../store/store'
import Toolbar from '../components/contacts/Toolbar'

const Contacts: React.FC = () => {
    const userId = useAppSelector((state) => state.user.id)
    const { _page, _limit, _sort, _order, q, totalCount } = useAppSelector((state) => state.contacts)
    const { setPage, incrementPage, decrementPage, toggleSort } = useActions()
    const { data: contacts, isLoading, isSuccess, isError, error } = useFetchContactsQuery(
        { _page, _limit, _sort, _order, q, userId }
    )

    const onSortChange = useCallback((name: keyof Contact) => {
        toggleSort(name)
    }, [toggleSort])

    const render = useCallback((item: Contact) => (
        <ContactItem key={item.id} {...item} />
    ), [])

    return (
        <LayoutPage title='Contacts'>
            <div className="max-w-7xl w-full mx-auto px-2 h-full flex flex-col gap-2">
                <Toolbar
                    limit={_limit}
                    sort={_sort}
                    order={_order}
                    search={q}
                    onSortChange={onSortChange}
                />
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
                    onChange={setPage}
                    increment={incrementPage}
                    decrement={decrementPage}
                />
            </div>
        </LayoutPage>
    )
}

export default Contacts