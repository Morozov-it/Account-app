import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL, STORAGE_TOKEN_KEY } from '../constants';

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: headers => {
            const accessToken = 'Bearer ' + localStorage.getItem(STORAGE_TOKEN_KEY)
            headers.set('Content-Type', 'application/json;charset=UTF-8')
            headers.set('Authorization', accessToken)

            return headers
        },
    }),
    tagTypes: ['Contacts', 'User'],
    endpoints: _ => ({}),
})