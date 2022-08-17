import { UserDTO, ResponseUserApi,  } from '../../models'
import { commonApi } from '../common.api'

export const userApi = commonApi.injectEndpoints({
    endpoints: build => ({
        register: build.mutation<ResponseUserApi, UserDTO>({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        login: build.mutation<ResponseUserApi, UserDTO>({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            }),
        }),
        updateUser: build.mutation<ResponseUserApi, Partial<UserDTO> & { id: number} >({
            query: (updatedUser) => ({
                url: `/users/${updatedUser.id}`,
                method: 'PATCH',
                body: updatedUser,
            }),
        }),
        deleteUser: build.mutation<null, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi