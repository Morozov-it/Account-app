import axios from 'axios'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_URL, STORAGE_TOKEN_KEY } from '../constants'
import { ResponseUserApi, UserDTO } from '../models'

const apiInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const login = (user: UserDTO) => {
    return apiInstance.post<ResponseUserApi>('/login', user)
}
export const register = (newUser: UserDTO) => {
    return apiInstance.post<ResponseUserApi>('/register', newUser)
}


export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: headers => {
            const accessToken = 'Bearer ' + JSON.parse(localStorage.getItem(STORAGE_TOKEN_KEY) ?? 'null')?.accessToken
            headers.set('Content-Type', 'application/json;charset=UTF-8')
            headers.set('Authorization', accessToken)

            return headers
        },
    }),
    tagTypes: ['Contacts', 'User'],
    endpoints: _ => ({}),
})