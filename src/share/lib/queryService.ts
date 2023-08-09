import {ParsedUrlQuery} from "querystring";

export const getNumberFromQuery = (query: ParsedUrlQuery, key: string) => {
    if (!(key in query)) return;

    const queryValue = query[key]
    if (typeof queryValue !== 'string') return

    const number = parseInt(queryValue)
    if (isNaN(number)) return

    return number
}