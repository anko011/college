import {decodeToken, TokenSet} from "@/share/lib/tokenService";
import {isUserWithRole} from "./lib";
import {ParsedUrlQuery} from "querystring";

export const getUserWithRoleFromTokenSet = (tokenSet: TokenSet) => {
    const payload = decodeToken(tokenSet.accessToken)

    if (payload.sub) {
        const user = JSON.parse(payload.sub)
        if (isUserWithRole(user)) return user
    }

    return null
}

export const getUsersPageFromQuery = (query: ParsedUrlQuery) => {
    let usersPage = 0;
    if ('usersPage' in query && typeof query.usersPage === 'string') {

        const page = parseInt(query.usersPage)
        if (isNaN(page) || page < 0) return usersPage
        usersPage = page
    }

    return usersPage
}