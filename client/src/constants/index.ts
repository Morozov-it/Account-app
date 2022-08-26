import { Group, Limit, Order, SelectType, Sort } from "../models"

export const BASE_URL = 'http://localhost:5000'
export const STORAGE_TOKEN_KEY = 'accessToken'
export const STORAGE_USER_KEY = 'user'

export const logoUrl = "https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"

export enum Routes {
    home = '/',
    contacts = '/contacts',
    login = '/login',
    register = '/register',
    settings = '/settings',
    notFound = "*",
}

export const navigation = [
    { name: 'Home', to: Routes.home },
    { name: 'Contacts', to: Routes.contacts },
]

export const groupSelect: Array<SelectType<Group | null>> = [
    { name: null, title: '' },
    { name: 'Family', title: 'Family' },
    { name: 'Friends', title: 'Friends' },
    { name: 'Work', title: 'Work' },
]

export const sortSelect: Array<SelectType<Sort>> = [
    { name: 'name', title: 'Name' },
    { name: 'phone', title: 'Phone' },
    { name: 'description', title: 'Description' },
    { name: 'created_date', title: 'Created date' },
    { name: 'updated_date', title: 'Updated date' },
]
export const orderSelect: Array<SelectType<Order>> = [
    { name: 'asc', title: 'Asc' },
    { name: 'desc', title: 'Desc' },
]
export const limitSelect: Array<SelectType<Limit>> = [
    { name: 5, title: '5' },
    { name: 10, title: '10' },
]

export const phonePattern = "[+][0-9]{1,}-[0-9]{3}-[0-9]{3}-[0-9]{4}"
