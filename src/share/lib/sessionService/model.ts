import {GetServerSidePropsContext} from "next";
import {NextRequest} from "next/server";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {decodeToken, isTokenSet, TokenSet} from "@/share/lib/tokenService";
import {createCookie, getRequestCookie} from "@/share/lib/cookieService";
import {EncodedSession} from "./types";
import {getSessionConfig} from "./config";
import {createContext, useContext} from "react";


const {sessionCookieName} = getSessionConfig()

function isEncodedSession(obj: unknown): obj is EncodedSession {
    return (
        typeof obj === 'object' && !!obj &&
        'tokenSet' in obj && !!obj.tokenSet && typeof obj.tokenSet === 'object' && isTokenSet(obj.tokenSet))
}

export function getEncodedSession(req: GetServerSidePropsContext['req'] | NextRequest): EncodedSession | null {
    const cookies = getRequestCookie(req)
    const session = cookies.get('session')
    if (!session) return null

    const data = JSON.parse(session.value)
    if (isEncodedSession(data)) return data

    return null
}

export function createEncodedSession(tokenSet: TokenSet): EncodedSession {
    return {tokenSet: tokenSet}
}


export function createCreatingSessionCookie(encodedUserSession: EncodedSession): ResponseCookies {
    const {exp = Date.now()} = decodeToken(encodedUserSession.tokenSet.refreshToken)

    const cookie = createCookie()
    cookie.set({
        name: sessionCookieName,
        value: JSON.stringify(encodedUserSession),
        maxAge: Math.floor(exp - Date.now() / 1000)
    })

    return cookie
}

export function createDeletingSessionCookie() {
    const cookie = createCookie()
    cookie.set({
        name: sessionCookieName,
        value: 'deleted',
        maxAge: -1
    })

    return cookie
}

export const SessionContext = createContext<EncodedSession>({
    tokenSet: {
        accessToken: '',
        refreshToken: ''
    }
})

export function useSession() {
    return useContext(SessionContext)
}




