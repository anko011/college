import {TokenSet} from "@/share/lib/tokenService";
import {getBackendHTTPConfig} from '@/share/lib/apiService'

import {getAuthBackendConfig} from "./config";


const {authHeaderName, authTokenName} = getAuthBackendConfig()
const {origin} = getBackendHTTPConfig()

export const authenticateByCredentials = async (credentials: string) => {
    return await fetch(`${origin}/auth/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}

export const logout = async () => {
    return await fetch(`${origin}/logout`, {
        method: 'POST',
    })
}

export const refreshToken = async (tokenSet: TokenSet) =>
    await fetch(`${origin}/auth/refresh-token`, {
        method: 'POST',
        headers: {
            [authHeaderName]: `${authTokenName} ${tokenSet.refreshToken}`
        }
    })
