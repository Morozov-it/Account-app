export interface User {
    name: string | null
    email: string | null
    id: number | null
}

export interface UserDTO {
    email: string
    password: string
    name?: string
}

export interface ResponseUserApi {
    accessToken: string
    user: User
}

export type Group = 'Friends' | 'Family' | 'Work'

export interface Contact {
    name: string
    description: string | null
    phone: string
    created_date: string
    updated_date: string | null
    group: Group | null
    blocked: boolean
    userId: number
    id: number
}

export interface FetchContactsParams {
    _page: number
    _limit: number
    _sort: string
    _order: string
    _filter: string
    q: string
}

export interface ContactsState {
    page: number
    limit: number
    totalCount: number
    sort: string | null
    order: string | null
    search: string | null
    filter: string | null
}

export interface ErrorType {
    status: number
    data: string
}