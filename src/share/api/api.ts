import {getBackendHTTPConfig} from "@/share/config";
import {getAuthBackendConfig} from "@/share/api/config";
import {TokenSet} from "@/share/lib/tokenService";
import {Credentials} from "@/share/api/types";

const {origin} = getBackendHTTPConfig()
const {authHeaderName, authTokenName} = getAuthBackendConfig()
export const authenticateByCredentials = async (credentials: Credentials) =>
    await fetch(`${origin}/auth/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

export const refreshToken = async (tokenSet: TokenSet) =>
    await fetch(`${origin}/auth/refresh-token`, {
        method: 'POST',
        headers: {
            [authHeaderName]: `${authTokenName} ${tokenSet.refreshToken}`
        }
    })
