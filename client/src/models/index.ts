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
    created_date: Date
    updated_date: Date | null
    group: Group | null
    blocked: boolean
    userId: number
    id: number
}

export interface Filter {
    [key: string]: string | number | null
}

export type IndexedObj = { [key: string]: string | number | null }

export interface FetchContactsParams {
    _page: number
    _limit: number
    _sort?: string
    _order?: string
    q?: string
    filter?: Filter
}

export interface ContactsState {
    _page: number
    _limit: number
    _sort: string | null
    _order: string | null
    q: string | null
    filter: Filter | null
    totalCount: number
}

export interface ErrorType {
    status: number
    data: string
}

export type Modals = 'createContact' | 'editContact' | null

export interface ModalState {
    active: Modals
}