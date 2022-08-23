import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Modals, ModalState } from "../../models"

const initialState: ModalState = {
    active: null
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<Modals>) => {
            state.active = action.payload
        },
    }
})

export const modalsActions = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer