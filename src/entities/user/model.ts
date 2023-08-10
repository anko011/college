import {ParsedUrlQuery} from "querystring";
import {decodeToken, TokenSet} from "@/share/lib/tokenService";
import {createObjectFromQuery} from "@/share/lib/queryService";
import {isUserWithRole} from "./lib";
import {SearchUserDto} from "./types";


export const getUserWithRoleFromTokenSet = (tokenSet: TokenSet) => {
    const payload = decodeToken(tokenSet.accessToken)

    if (payload.sub) {
        const user = JSON.parse(payload.sub)
        if (isUserWithRole(user)) return user
    }

    return null
}


export const createSearchUserDto = (query: ParsedUrlQuery): SearchUserDto | undefined => {
    return createObjectFromQuery(query, ['login', 'firstName', 'secondName', 'patronymic'])
}

export const createSearchUserQueryString = (dto?: SearchUserDto) => {
    if (!dto) return ''
    const params = new URLSearchParams(dto as Record<string, string>)
    return params.toString()
}