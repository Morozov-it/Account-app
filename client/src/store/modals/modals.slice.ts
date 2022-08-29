import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Contact, Modals, ModalState, NewContact } from "../../models"

const initialState: ModalState = {
    active: null,
    createdInfo: {
        name: '',
        description: '',
        phone: '',
        group: null,
    },
    editedContact: null
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<Modals>) => {
            state.active = action.payload
        },
        setCreatedInfo: (state, action: PayloadAction<Partial<NewContact>>) => {
            Object.assign(state.createdInfo, action.payload)
        },
        setEditedContact: (state, action: PayloadAction<Contact>) => {
            state.editedContact = action.payload
        }, 
        changeEditedContact: (state, action: PayloadAction<Partial<NewContact>>) => {
            !!state.editedContact && Object.assign(state.editedContact, action.payload)
        },
        resetEditedContact: (state) => {
            state.editedContact = initialState.editedContact
        },
        resetCreateInfo: (state) => {
            state.createdInfo = initialState.createdInfo
        }
    }
})

export const modalsActions = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer