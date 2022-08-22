import { UserDTO, User  } from '../../models'
import { commonApi } from '../common.api'

export const userApi = commonApi.injectEndpoints({
    endpoints: build => ({
        updateUser: build.mutation<User, Partial<UserDTO> & { id: number} >({
            query: (updatedUser) => ({
                url: `/users/${updatedUser.id}`,
                method: 'PATCH',
                body: updatedUser,
            }),
            transformResponse: (response: User & { password: string }) => {
                return {
                    name: response.name,
                    email: response.email,
                    id: response.id,
                }
            }
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