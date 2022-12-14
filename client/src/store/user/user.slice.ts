import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { STORAGE_USER_KEY } from "../../constants"
import { User } from "../../models"

const user: User | null = JSON.parse(localStorage.getItem(STORAGE_USER_KEY) ?? 'null')

const initialState: User & { isAuth: boolean } = {
    isAuth: !!user,
    name: user?.name ?? null,
    email: user?.email ?? null,
    id: user?.id ?? null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.isAuth = true
            state.name = action.payload.name
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