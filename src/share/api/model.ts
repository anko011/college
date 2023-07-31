import {GetServerSidePropsContext} from "next";
import {createCreatingSessionCookie, createEncodedSession, getEncodedSession,} from "@/share/lib/sessionService";
import {isExpiredToken, TokenSet} from "@/share/lib/tokenService";
import {getBackendHTTPConfig} from "@/share/config";
import {getAuthBackendConfig} from "./config";

const {authHeaderName, authTokenName} = getAuthBackendConfig()
const {origin} = getBackendHTTPConfig()

export async function fetchData(
    ctx: GetServerSidePropsContext,
    fetchRequest: Request
) {
    const encodedUserSession = getEncodedSession(ctx.req)


    if (encodedUserSession) {
        const {tokenSet} = encodedUserSession
        const newTokenSet = await getUpdatedTokenSet(tokenSet)

        if (newTokenSet) {
            const newEncodedUserSession = createEncodedSession(newTokenSet)
            const cookie = createCreatingSessionCookie(newEncodedUserSession)
            ctx.res.setHeader('Set-Cookie', cookie.toString())

            const request = new Request(fetchRequest)
            request.headers.append(authHeaderName, createAuthHeaderString(newTokenSet.accessToken))
            return fetch(request)
        }
    }

    return fetch(fetchRequest)
}


function createAuthHeaderString(token: string) {
    return `${authTokenName} ${token}`
}

async function getUpdatedTokenSet(tokenSet: TokenSet): Promise<TokenSet | null> {

    if (isExpiredToken(tokenSet.accessToken)) {
        const response = await fetch(`${origin}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                [authHeaderName]: `${authTokenName} ${tokenSet.refreshToken}`
            }
        })
        if (!response.ok) return null

        return await response.json()
    }

    return tokenSet
}
