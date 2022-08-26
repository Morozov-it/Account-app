import { Dayjs } from "dayjs"

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
    description: string
    phone: string
    created_date: Date | Dayjs
    updated_date: Date | Dayjs | null
    group: Group | null
    blocked: boolean
    userId: number
    id: number
}

export type NewContact = Pick<Contact, 'name' | 'description' | 'phone' | 'group'>

export type Sort = keyof Contact
export type Order = 'asc' | 'desc'
export type Limit = 5 | 10
export type IndexedObj = { [key: string]: string | number | null }

export interface SelectType<T> {
    name: T
    title: string
}
export type GroupFilter = {
    [key in Group]: boolean
}

export interface ContactsState {
    _page: number
    _limit: Limit
    _sort: Sort
    _order: Order
    q: string
    search: string
    filter: GroupFilter
    totalCount: number
}

export interface ErrorType {
    status: number
    data: string
}

export type Modals = 'createContact' | 'editContact' | null

export interface ModalState {
    active: Modals
    createInfo: NewContact
}