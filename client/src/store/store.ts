import { bindActionCreators, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { userActions, userReducer } from './user/user.slice'
import { commonApi } from './common.api'
import { contactsActions, contactsReducer } from './contacts/contacts.slice'

const actions = {
    ...userActions,
    ...contactsActions,
}

export const store = configureStore({
    reducer: {
        user: userReducer,
        contacts: contactsReducer,
        [commonApi.reducerPath]: commonApi.reducer,
    }
})

//enable refetchOnMount and refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

//usabled hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}