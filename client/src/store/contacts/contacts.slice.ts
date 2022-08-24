import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContactsState, Sort, Order, Limit } from "../../models"

const initialState: ContactsState = {
    _page: 1,
    _limit: 5,
    _sort: 'created_date',
    _order: 'asc',
    q: '',
    totalCount: 0,
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state._page = action.payload
        },
        incrementPage: (state) => {
            state._page = state._page + 1
        },
        decrementPage: (state) => {
            state._page = state._page - 1
        },
        setLimit: (state, action: PayloadAction<Limit>) => {
            state._limit = action.payload
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload
        },
        toggleSort: (state, action: PayloadAction<Sort>) => {
            state._sort = action.payload
        },
        toggleOrder: (state, action: PayloadAction<Order>) => {
            state._order = action.payload
        },
        search: (state, action: PayloadAction<string>) => {
            state.q = action.payload
        },
        reset: (state) => {
            state._page = 1
            state._limit = 5
            state._sort = 'created_date'
            state._order = 'asc'
            state.q = ''
        }
    }
})

export const contactsActions = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer