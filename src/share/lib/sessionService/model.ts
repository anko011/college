import {GetServerSidePropsContext} from "next";
import {NextRequest} from "next/server";
import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {decodeToken, isTokenSet, TokenSet} from "@/share/lib/tokenService";
import {getRequestCookies} from "@/share/lib/cookieService";
import {EncodedSession} from "./types";
import {getSessionConfig} from "./config";


const {sessionCookieName} = getSessionConfig()

export const createEncodedSession = (tokenSet: TokenSet): EncodedSession => ({tokenSet: tokenSet})

const isEncodedSession = (obj: unknown): obj is EncodedSession => (
    typeof obj === 'object' && !!obj &&
    'tokenSet' in obj && !!obj.tokenSet && typeof obj.tokenSet === 'object' && isTokenSet(obj.tokenSet))

export function getEncodedSession(req: GetServerSidePropsContext['req'] | NextRequest): EncodedSession | null {
    const cookies = getRequestCookies(req)
    const session = cookies.get('session')
    if (!session) return null

    const data = JSON.parse(session.value)
    if (isEncodedSession(data)) return data

    return null
}

export const createCreatingSessionCookie = (encodedSession: EncodedSession): ResponseCookie => {
    const {exp = Date.now()} = decodeToken(encodedSession.tokenSet.refreshToken)

    return {
        httpOnly: true,
        path: "/",
        name: sessionCookieName,
        value: JSON.stringify(encodedSession),
        maxAge: Math.floor(exp - Date.now() / 1000)
    }
}

export const createDeletingSessionCookie = (): ResponseCookie => ({
    name: sessionCookieName,
    value: 'deleted',
    maxAge: -1,
    httpOnly: true,
    path: '/'
})





