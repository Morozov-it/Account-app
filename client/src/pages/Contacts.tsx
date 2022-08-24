import React, { useCallback, useMemo, useState } from 'react'
import LayoutPage from '../components/LayoutPage'
import { ContactItem, List } from '../components/contacts'
import Pagination from '../components/Pagination'
import { Contact, Group, GroupFilter, Limit, Order, Sort } from '../models'
import { useFetchContactsQuery } from '../store/contacts/contacts.api'
import { useActions, useAppSelector } from '../store/store'
import Toolbar from '../components/contacts/Toolbar'
import { getFilteredContacts } from '../utils/getFilteredContacts'

const Contacts: React.FC = () => {
    const [filter, setFilter] = useState<GroupFilter>({ Family: false, Friends: false, Work: false })
    const userId = useAppSelector((state) => state.user.id)
    const { _page, _limit, _sort, _order, q, totalCount } = useAppSelector((state) => state.contacts)
    const { setPage, incrementPage, decrementPage, search, toggleSort, toggleOrder, setLimit, reset } = useActions()
    const { data: contacts, isLoading, isSuccess, isError, error } = useFetchContactsQuery(
        { _page, _limit, _sort, _order, q, userId }
    )
    const filteredContacts = useMemo(() => getFilteredContacts(filter, contacts), [filter, contacts])

    const onSearch = useCallback((value: string) => {
        search(value)
        setPage(1)
    }, [search, setPage])
    const onFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as Group
        setFilter((prev) => ({
            ...prev,
            [name]: !prev[name],
        }))
    }, [])
    const onSortChange = useCallback((name: Sort) => {
        toggleSort(name)
    }, [toggleSort])
    const onLimitChange = useCallback((n: Limit) => {
        setLimit(n)
    }, [setLimit])
    const onOrderChange = useCallback((name: Order) => {
        toggleOrder(name)
    }, [toggleOrder])
    const onReset = useCallback(() => {
        reset()
        setFilter({ Family: false, Friends: false, Work: false })
    }, [reset])

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
                    filter={Object.entries(filter)}
                    onSearch={onSearch}
                    onSortChange={onSortChange}
                    onOrderChange={onOrderChange}
                    onLimitChange={onLimitChange}
                    onReset={onReset}
                    onFilterChange={onFilterChange}
                />
                <List<Contact>
                    data={filteredContacts}
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