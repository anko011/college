import {ParsedUrlQuery} from "querystring";

export const getNumberFromQuery = (query: ParsedUrlQuery, key: string) => {
    if (!(key in query)) return;

    const queryValue = query[key]
    if (typeof queryValue !== 'string') return

    const number = parseInt(queryValue)
    if (isNaN(number)) return

    return number
}


export const createObjectFromQuery = <T extends object, K extends keyof T>(query: ParsedUrlQuery, keys: K[]): Partial<T> | undefined => {

    let object: Partial<T> = {}
    keys.forEach(key => {
        if (key in query) {
            const value = query[key as keyof typeof query]
            if (typeof value !== 'string') return

            object[key] = value as T[K]
        }
    })

    if (Object.keys(object).length === 0) return
    return object
}