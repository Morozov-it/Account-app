import { Contact, ContactsParams } from '../../models'
import { commonApi } from '../common.api'
import { userActions } from '../user/user.slice'
import { contactsActions } from './contacts.slice'
import { getFetchParams } from '../../utils/getFetchParams'

export const contactsApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchContacts: build.query<Contact[], ContactsParams>({
            query: (params) => ({
                url: '/contacts',
                params: getFetchParams(params),
            }),
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then((data) => {
                        dispatch(contactsActions.setTotalCount(Number(data.meta?.response?.headers.get('X-Total-Count'))))
                    })
                    .catch((data) => {
                        if (data.error.status === 401) {
                            dispatch(userActions.logout())
                        } else {
                            console.error(data.error)
                        }
                    })
            },
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Contacts' as const, id })),
                    { type: 'Contacts', id: 'LIST' },
                ]
                : [{ type: 'Contacts', id: 'LIST' }],
        }),
        createContact: build.mutation<Contact, Omit<Contact, 'id'>>({
            query: (newContact) => ({
                url: '/contacts',
                method: 'POST',
                body: newContact,
            }),
            //refetch contacts
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
        blockContact: build.mutation<Contact, { id: number, blocked: boolean, params: ContactsParams}>({
            query: ({ id, blocked }) => ({
                url: `/contacts/${id}`,
                method: 'PATCH',
                body: { id, blocked },
            }),
            //optimistic update - before fulfilled query
            async onQueryStarted({ id, blocked, params }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    contactsApi.util.updateQueryData('fetchContacts', params, draft => {
                        //draft is mutable proxy!
                        const contact = draft.find(contact => contact.id === id)
                        if (contact) {
                            contact.blocked = blocked
                        }
                    }))
                queryFulfilled.catch(() => {
                    patchResult.undo()
                    console.error('contactsApi updateContact error')
                })
            },
        }),
        updateContact: build.mutation<Contact, { updated: Contact, params: ContactsParams}>({
            query: ({ updated }) => ({
                url: `/contacts/${updated.id}`,
                method: 'PUT',
                body: updated,
            }),
            //pessimistic update - after fulfilled query
            async onQueryStarted({ updated, params }, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then((data) => {
                        dispatch(
                            contactsApi.util.updateQueryData('fetchContacts', params, draft => {
                                let contact = draft.find(contact => contact.id === updated.id)
                                !!contact && Object.assign(contact, updated)
                            })
                        )
                    })
                    .catch(() => {
                        console.error('contactsApi updateContact error')
                    })
            },
        }),
        deleteContact: build.mutation<{}, number>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Contacts', id }],
        }),
    }),
})

export const {
    useCreateContactMutation,
    useDeleteContactMutation,
    useFetchContactsQuery,
    useBlockContactMutation,
    useUpdateContactMutation,
} = contactsApi