import { FetchContactsParams, Filter, IndexedObj } from "../models"

export const getFetchParams = (params: IndexedObj, filter: Filter | null) => {
    const result: IndexedObj = {}
    Object.keys(params).forEach((key) => {
        if (params[key] !== null) {
            result[key] = params[key]
        }
    })
    
    return !!filter
        ? { ...result, ...filter } as unknown as FetchContactsParams
        : result as unknown as FetchContactsParams
}