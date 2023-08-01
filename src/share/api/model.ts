import {GetServerSidePropsContext, NextApiRequest} from "next";
import {NextRequest} from "next/server";
import {getEncodedSession,} from "@/share/lib/sessionService";
import {isExpiredToken, TokenSet} from "@/share/lib/tokenService";
import {getBackendHTTPConfig} from "@/share/config";
import {getAuthBackendConfig} from "./config";
import {refreshToken} from "./api";
import {BackendResponse, BodyWithMessage} from "@/share/api/types";

const {authHeaderName, authTokenName} = getAuthBackendConfig()
const {origin} = getBackendHTTPConfig()

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


export const getBaseUrlByFetchSide = (req?: GetServerSidePropsContext['req']) => req ? `${origin}` : '/api'

export const createRequestCreatorByFetchSide = (input: RequestInfo | URL, init?: RequestInit): (req?: GetServerSidePropsContext['req']) => Request => (req) => {
    const request = new Request(input, init)
    return req ? withAuthRequest(request, req) : request
}

export const parseResponseOrError = async <T extends {}, >(response: Promise<BackendResponse<T | BodyWithMessage>>) => {
    const res = await response
    const data = await res.json()
    if ('message' in data) throw new Error(data.message)
    return data
}
