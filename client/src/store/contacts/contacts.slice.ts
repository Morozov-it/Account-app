import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContactsState, Filter } from "../../models"

const initialState: ContactsState = {
    _page: 1,
    _limit: 10,
    _sort: null,
    _order: null,
    q: null,
    filter: null,
    totalCount: 0,
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<number>) => {
            state._page = action.payload
        },
        incrementPage: (state) => {
            state._page = state._page + 1
        },
        decrementPage: (state) => {
            state._page = state._page - 1
        },
        changeLimit: (state, action: PayloadAction<number>) => {
            state._limit = action.payload
        },
        changeTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload
        },
        changeSort: (state, action: PayloadAction<string>) => {
            state._sort = action.payload
        },
        changeOrder: (state, action: PayloadAction<string>) => {
            state._order = action.payload
        },
        changeSearch: (state, action: PayloadAction<string>) => {
            state.q = action.payload
        },
        changeFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload
        },
        reset: () => initialState
    }
})

export const contactsActions = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer