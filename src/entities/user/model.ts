import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {decodeToken, TokenSet} from "@/share/lib/tokenService";
import {getEncodedSession} from "@/share/lib/sessionService";
import {isUserWithRole} from "./lib";
import {User} from "./types";


export const getUserWithRoleFromTokenSet = (tokenSet: TokenSet) => {
    const payload = decodeToken(tokenSet.accessToken)

    if (payload.sub) {
        const user = JSON.parse(payload.sub)
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

