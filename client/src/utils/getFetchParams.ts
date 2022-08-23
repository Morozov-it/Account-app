import { IndexedObj } from "../models"

export const getFetchParams = (params: IndexedObj) => {
    const result: IndexedObj = {}
    Object.keys(params).forEach((key) => {
        if (params[key] !== null) {
            result[key] = params[key]
        }
    })
    return result
}