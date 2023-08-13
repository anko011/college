import {ParsedUrlQuery} from "querystring";
import {decodeToken, TokenSet} from "@/share/lib/tokenService";
import {createObjectFromQuery} from "@/share/lib/queryService";
import {isUserWithRole} from "./lib";
import {SearchUserDto, User} from "./types";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {getEncodedSession} from "@/share/lib/sessionService";


export const getUserWithRoleFromTokenSet = (tokenSet: TokenSet) => {
    const payload = decodeToken(tokenSet.accessToken)

    if (payload.sub) {
        const user = JSON.parse(payload.sub)
        console.log(user)
        if (isUserWithRole(user)) return user
    }

    return null
}

export interface GetServerSidePropsContextWithUser extends GetServerSidePropsContext {
    user: User | null
}

export const withUser = (getServerSideProps: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const ctxWithUser: GetServerSidePropsContextWithUser = {...ctx, user: null}
    const encodedSession = getEncodedSession(ctx.req)
    if (encodedSession) {
        ctxWithUser.user = getUserWithRoleFromTokenSet(encodedSession.tokenSet)

    }
    return await getServerSideProps(ctxWithUser)
}

export const createSearchUserDto = (query: ParsedUrlQuery): SearchUserDto | undefined => {
    return createObjectFromQuery(query, ['login', 'firstName', 'secondName', 'patronymic'])
}

export const createSearchUserQueryString = (dto?: SearchUserDto) => {
    if (!dto) return ''
    const params = new URLSearchParams(dto as Record<string, string>)
    return params.toString()
}