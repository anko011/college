import {ParsedUrlQuery} from "querystring";

export const getNumberFromQuery = (query: ParsedUrlQuery, key: string) => {
    if (!(key in query)) return;

    const queryValue = query[key]
    if (typeof queryValue !== 'string') return

    const number = parseInt(queryValue)
    if (isNaN(number)) return

    return number
}


export const getBackendMappedQuery = (mapper: { key: string, backendKey: string }[], query: ParsedUrlQuery) => {
    const queries = Object.fromEntries(mapper
        .map(({key, backendKey}) => [backendKey, query[key]])
        .filter(([_, value]) => typeof value === 'string')
    )

    const params = new URLSearchParams(queries)
    return params.toString()
}

export const splitQuery = (...args: string[]) => {
    return args
        .filter(query => query !== '')
        .join('&')
}