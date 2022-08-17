import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ContactsState } from "../../models"

const initialState: ContactsState = {
    page: 1,
    limit: 10,
    totalCount: 0,
    sort: null,
    order: null,
    search: null
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        changeLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload
        },
        changeTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload
        },
        changeSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload
        },
        changeOrder: (state, action: PayloadAction<string>) => {
            state.order = action.payload
        },
        changeSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        reset: () => initialState
    }
})

export const contactsActions = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer