import * as jose from "jose";
import {TokenSet} from "./types";

export function isTokenSet(obj: unknown): obj is TokenSet {
    return (
        typeof obj === 'object' && !!obj &&
        'accessToken' in obj && typeof obj.accessToken === 'string' &&
        'refreshToken' in obj && typeof obj.refreshToken === 'string')
}

export function isExpiredToken(accessToken: string): boolean {
    const payload = decodeToken(accessToken)
    if (!payload.exp) return false

    const timestamp = Date.now()
    return timestamp - payload.exp < 0
}


export function decodeToken(token: string) {
    return jose.decodeJwt(token)
}