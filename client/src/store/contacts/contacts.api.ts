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
            providesTags: [{ type: 'Contacts' }]
        }),
        createContact: build.mutation<Contact, Omit<Contact, 'id'>>({
            query: (newContact) => ({
                url: '/contacts',
                method: 'POST',
                body: newContact,
            }),
            invalidatesTags: [{ type: 'Contacts' }],
        }),
        blockContact: build.mutation<Contact, { id: number, blocked: boolean, params: IndexedObj} >({
            query: ({ id, blocked }) => ({
                url: `/contacts/${id}`,
                method: 'PATCH',
                body: { id, blocked },
            }),
            //optimistic update
            async onQueryStarted({ id, blocked, params }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    contactsApi.util.updateQueryData('fetchContacts', params, draft => {
                        const contact = draft.find(contact => contact.id === id)
                        if (contact) {
                            contact.blocked = blocked
                        }
                    }))
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                    console.error('contactsApi updateContact error')
                }
            }
        }),
        deleteContact: build.mutation<null, number>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Contacts' }],
        }),
    }),
})

export const {
    useCreateContactMutation,
    useDeleteContactMutation,
    useFetchContactsQuery,
    useBlockContactMutation
} = contactsApi