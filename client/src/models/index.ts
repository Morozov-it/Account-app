export interface User {
    email: string | null
    id: number | null
}

export interface UserDTO {
    email: string
    password: string
}

export interface ResponseUserApi {
    accessToken: string
    user: User
}

export interface Contact {
    name: string
    description: string
    phone: string
    created_date: string
    updated_date: string
    userId: number
    id: number
}

export interface FetchContactsParams {
    _page: number
    _limit: number
    _sort: string
    _order: string
    q: string
}

export interface ContactsState {
    page: number
    limit: number
    totalCount: number
    sort: string | null
    order: string | null
    search: string | null
}