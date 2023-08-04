import {ResponseCreator} from "@/middleware";
import {isExpiredToken, TokenSet} from "@/share/lib/tokenService";

import {getAuthBackendConfig} from "./config";
import {refreshToken} from "./api";
import {GetServerSidePropsContext} from "next";
import {NextRequest} from "next/server";
import {
    createCreatingSessionCookie,
    createDeletingSessionCookie,
    createEncodedSession
} from "@/share/lib/sessionService";

const {authHeaderName, authTokenName} = getAuthBackendConfig()


const createAuthHeaderString = (token: string) => `${authTokenName} ${token}`

export const createAuthenticatedResponse = (creator: ResponseCreator, req: NextRequest, tokenSet: TokenSet) => {
    const headers = new Headers(req.headers)
    headers.set(authHeaderName, createAuthHeaderString(tokenSet.accessToken))

    const newSession = createEncodedSession(tokenSet)
    const cookie = createCreatingSessionCookie(newSession)

    const response = creator({
        request: {headers},
    })
    response.cookies.set(cookie)

    return response
}


export const createUnauthenticatedResponse = (creator: ResponseCreator) => {
    const headers = new Headers()
    const cookie = createDeletingSessionCookie()

    const response = creator({
        request: {headers}
    })
    response.cookies.set(cookie)

    return response
}

export const withAuthHeader = (init: RequestInit, request?: GetServerSidePropsContext['req']): RequestInit => {
    const auth = request?.headers.authorization
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


