import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../models"

const initialState: User = {
    email: null,
    id: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.email = action.payload.email
            state.id = action.payload.id
        },
        logout: () => initialState
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer