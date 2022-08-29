import { ContactsParams } from "../models"

export const getFetchParams = (params: ContactsParams) => {
    let result = {} as any
    (Object.keys(params) as Array<keyof ContactsParams>).forEach((key) => {
        if (!!params[key]) {
            result[key] = params[key]
        }
    })
    return result as ContactsParams
}