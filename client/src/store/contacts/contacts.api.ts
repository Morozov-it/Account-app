import { Contact, FetchContactsParams } from '../../models'
import { commonApi } from '../common.api'

export const contactsApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchContacts: build.query<Contact[], Partial<FetchContactsParams>>({
            query: (params) => ({
                url: '/contacts',
                params,
            }),
            providesTags: [{ type: 'Contacts', id: 'List' }],
        }),
        createContact: build.mutation<Contact, Contact>({
            query: (newContact) => ({
                url: '/contacts',
                method: 'POST',
                body: newContact,
            }),
            async onQueryStarted(newContact, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(
                        contactsApi.util.updateQueryData('fetchContacts', {
                            _page: 1,
                            _limit: 10,
                        }, draft => {
                            draft.unshift(data)
                        })
                    )
                } catch {
                    console.error('contactsApi createContact error')
                }
            },
        }),
        updateContact: build.mutation<Contact, Partial<Contact> >({
            query: (updatedContact) => ({
                url: `/contacts/${updatedContact.id}`,
                method: 'PATCH',
                body: updatedContact,
            }),
            invalidatesTags: ['Contacts'],
        }),
        deleteContact: build.mutation<null, number>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contacts'],
        }),
    }),
})

export const {
    useCreateContactMutation,
    useDeleteContactMutation,
    useFetchContactsQuery,
    useUpdateContactMutation
} = contactsApi