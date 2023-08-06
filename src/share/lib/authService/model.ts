import {isExpiredToken, TokenSet} from "@/share/lib/tokenService";

import {getAuthBackendConfig} from "./config";
import {refreshToken} from "./api";
import {GetServerSidePropsContext} from "next";
import {NextMiddleware, NextResponse} from "next/server";
import {
    createCreatingSessionCookie,
    createDeletingSessionCookie,
    createEncodedSession,
    getEncodedSession
} from "@/share/lib/sessionService";
import type {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";

const {authHeaderName, authTokenName} = getAuthBackendConfig()

const getAuthHeaderValue = (token: string) => `${authTokenName} ${token}`

export const withAuthMiddleware = (middleware: NextMiddleware): NextMiddleware => async (request, event) => {
    const session = getEncodedSession(request)
    const headers = new Headers(request.headers)

    let cookie: ResponseCookie;

    if (session) {
        const updatedTokenSet = await getUpdatedTokenSet(session.tokenSet)

        if (updatedTokenSet) {
            headers.set(authHeaderName, getAuthHeaderValue(updatedTokenSet.accessToken))
            const session = createEncodedSession(updatedTokenSet)
            cookie = createCreatingSessionCookie(session)
        } else {
            cookie = createDeletingSessionCookie()
            headers.delete(authHeaderName)
        }

    } else {
        headers.delete(authHeaderName)
        cookie = createDeletingSessionCookie()
    }

    const response = NextResponse.next({...await middleware(request, event), request: {headers}})
    response.cookies.set(cookie)
    return response
}

export const withAuthHeader = (init: RequestInit, request?: GetServerSidePropsContext['req']): RequestInit => {
    const auth = request?.headers?.authorization
    if (typeof auth === 'string') {
        return {
            ...init,
            headers: {
                [authHeaderName]: auth,
            }
        }
    }

    return init
}

export const getUpdatedTokenSet = async (tokenSet: TokenSet): Promise<TokenSet | null> => {

    if (isExpiredToken(tokenSet.accessToken)) {
        const response = await refreshToken(tokenSet)
        if (!response.ok) return null

        return await response.json()
    }

    return tokenSet
}


