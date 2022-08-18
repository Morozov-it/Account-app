import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { STORAGE_TOKEN_KEY } from "../../constants"
import { User } from "../../models"

const user: User | undefined = JSON.parse(localStorage.getItem(STORAGE_TOKEN_KEY) ?? 'null')?.user

const initialState: User & { isAuth: boolean } = {
    isAuth: !!user,
    email: user?.email ?? null,
    id: user?.id ?? null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.isAuth = true
            state.email = action.payload.email
            state.id = action.payload.id
        },
        logout: (state) => {
            state.isAuth = false
            state.email = null
            state.id = null
        }
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer