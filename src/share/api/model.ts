import {GetServerSidePropsContext, NextApiRequest} from "next";
import {NextRequest} from "next/server";
import {getEncodedSession,} from "@/share/lib/sessionService";
import {isExpiredToken, TokenSet} from "@/share/lib/tokenService";
import {getAuthBackendConfig} from "./config";
import {refreshToken} from "@/share/api/api";

const {authHeaderName, authTokenName} = getAuthBackendConfig()

type AppRequest = NextApiRequest | NextRequest | GetServerSidePropsContext['req']

const createAuthHeaderString = (token: string) => `${authTokenName} ${token}`

export const withAuthRequest = (fetchRequest: Request, req: AppRequest) => {
    const session = getEncodedSession(req)

    if (session) {
        fetchRequest.headers.set(authHeaderName, createAuthHeaderString(session.tokenSet.accessToken))
    }

    return fetchRequest
}

export const getUpdatedTokenSet = async (tokenSet: TokenSet): Promise<TokenSet | null> => {

    if (isExpiredToken(tokenSet.accessToken)) {
        const response = await refreshToken(tokenSet)
        if (!response.ok) return null

        return await response.json()
    }

    return tokenSet
}
