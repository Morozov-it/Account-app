import { SortSelect } from "../models"

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

export const sortSelect: Array<SortSelect> = [
    { name: 'name', title: 'Name' },
    { name: 'phone', title: 'Phone' },
    { name: 'description', title: 'Description' },
    { name: 'created_date', title: 'Created date' },
    { name: 'updated_date', title: 'Updated date' },
]