import {ParsedUrlQuery} from "querystring";
import {decodeToken, TokenSet} from "@/share/lib/tokenService";
import {getNumberFromQuery} from "@/share/lib/queryService";
import {isUserWithRole} from "./lib";
import {SearchUserDto} from "./types";
import {getUserConfig} from "./config";

const {queryPageKey} = getUserConfig()

export const getUserWithRoleFromTokenSet = (tokenSet: TokenSet) => {
    const payload = decodeToken(tokenSet.accessToken)

    if (payload.sub) {
        const user = JSON.parse(payload.sub)
        if (isUserWithRole(user)) return user
    }

    return null
}

export const getUsersPageFromQuery = (query: ParsedUrlQuery) => {
    let page = getNumberFromQuery(query, queryPageKey)
    if (page && page < 0) page = 0
    return page ?? 0
}

export const createSearchUserDto = (query: ParsedUrlQuery): SearchUserDto | undefined => {
    const dtoKeys: Array<keyof SearchUserDto> = ['login', 'firstName', 'secondName', 'patronymic']

    let dto: SearchUserDto = {}
    dtoKeys.forEach(key => {
        if (key in query) {
            const value = query[key]
            if (typeof value !== 'string') return

            dto[key] = value
        }
    })

    if (Object.keys(dto).length === 0) return
    return dto
}

export const createSearchUserQueryString = (dto?: SearchUserDto) => {
    if (!dto) return ''
    const params = new URLSearchParams(dto as Record<string, string>)
    return params.toString()
}