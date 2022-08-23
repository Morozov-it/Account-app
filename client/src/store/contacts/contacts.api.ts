import { Contact, IndexedObj } from '../../models'
import { commonApi } from '../common.api'
import { userActions } from '../user/user.slice'
import { contactsActions } from './contacts.slice'
import { getFetchParams } from '../../utils/getFetchParams'

export const contactsApi = commonApi.injectEndpoints({
    endpoints: build => ({
        fetchContacts: build.query<Contact[], IndexedObj>({
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
            providesTags: [{ type: 'Contacts', id: 'List' }],
        }),
        createContact: build.mutation<Contact, Contact>({
            query: (newContact) => ({
                url: '/contacts',
                method: 'POST',
                body: newContact,
            }),
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
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