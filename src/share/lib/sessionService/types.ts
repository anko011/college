import {TokenSet} from "@/share/lib/tokenService";

export interface EncodedSession {
    tokenSet: TokenSet
}

export interface SessionConfig {
    sessionCookieName: string
}