/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react'
import { ContactItem, CreateModal, EditModal, LayoutPage, List, Pagination, Toolbar } from '../components'
import { Contact, ContactsParams, Group, Limit, Order, Sort } from '../models'
import { useFetchContactsQuery } from '../store/contacts/contacts.api'
import { useActions, useAppSelector } from '../store/store'
import { getFilteredContacts } from '../utils/getFilteredContacts'

const Contacts: React.FC = () => {
    const userId = useAppSelector((state) => state.user.id)
    const activeModal = useAppSelector((state) => state.modals.active)
    const {
        _page,
        _limit,
        _sort,
        _order,
        q,
        filter,
        totalCount
    } = useAppSelector((state) => state.contacts)

    const params: ContactsParams = { _page, _limit, _sort, _order, q, userId }

    const {
        setPage,
        incrementPage,
        decrementPage,
        search,
        toggleSort,
        toggleOrder,
        setLimit,
        setFilter,
        reset,
        toggleModal,
    } = useActions()

    const { data: contacts, isLoading, isFetching, isSuccess, isError, error } = useFetchContactsQuery(params)
    const filteredContacts = useMemo(() => getFilteredContacts(filter, contacts), [filter, contacts])
    const filterCatalog = useMemo(() => Object.entries(filter), [filter])

    const onSearch = useCallback((value: string) => {
        search(value)
        setPage(1)
    }, [])
    const onFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as Group
        setFilter(name)
    }, [])
    const onSortChange = useCallback((name: Sort) => {
        toggleSort(name)
    }, [])
    const onLimitChange = useCallback((num: Limit) => {
        setLimit(num)
        setPage(1)
    }, [])
    const onOrderChange = useCallback((name: Order) => {
        toggleOrder(name)
    }, [])
    const onReset = useCallback(() => {
        reset()
    }, [])
    const onCreate = useCallback(() => {
        toggleModal('createContact')
    }, [])
    const onCloseModal = useCallback(() => {
        toggleModal(null)
    }, [])

    const render = useCallback((item: Contact) => (
        <ContactItem key={item.id} contact={item} params={params} />
    ), [params])

    return (
        <>
            <LayoutPage title='Contacts'>
                <div className="max-w-7xl w-full mx-auto px-2 h-full flex flex-col gap-2">
                    <Toolbar
                        limit={_limit}
                        sort={_sort}
                        order={_order}
                        filter={filterCatalog}
                        onSearch={onSearch}
                        onSortChange={onSortChange}
                        onOrderChange={onOrderChange}
                        onLimitChange={onLimitChange}
                        onReset={onReset}
                        onCreate={onCreate}
                        onFilterChange={onFilterChange}
                    />
                    <List<Contact>
                        data={filteredContacts}
                        isLoading={isLoading || isFetching}
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

            {/* modals */}
            <EditModal open={activeModal === 'editContact'} onClose={onCloseModal} params={params} />
            <CreateModal userId={userId} open={activeModal === 'createContact'} onClose={onCloseModal} />
        </>
    )
}

export default Contacts