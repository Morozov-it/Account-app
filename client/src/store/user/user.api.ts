import { UserDTO, ResponseUserApi,  } from '../../models'
import { commonApi } from '../common.api'

export const userApi = commonApi.injectEndpoints({
    endpoints: build => ({
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
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi