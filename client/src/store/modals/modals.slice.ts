import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Modals, ModalState, NewContact } from "../../models"

const initialState: ModalState = {
    active: null,
    createInfo: {
        name: '',
        description: '',
        phone: '',
        group: null,
    },
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<Modals>) => {
            state.active = action.payload
        },
        setCreateInfo: (state, action: PayloadAction<Partial<NewContact>>) => {
            state.createInfo = {
                ...state.createInfo,
                ...action.payload
            }
        },
        resetCreateInfo: (state) => {
            state.createInfo = initialState.createInfo
        }
    }
})

export const modalsActions = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer