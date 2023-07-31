import {GetServerSidePropsContext} from "next";
import {NextRequest} from "next/server";
import {decodeToken} from "@/share/lib/tokenService";
import {getEncodedSession} from "@/share/lib/sessionService";
import {UserWithRole} from "./types";
import {isUserWithRole} from ".//lib";


export function getUserWithRole(req: GetServerSidePropsContext['req'] | NextRequest): UserWithRole | null {
    const sessionCookie = getEncodedSession(req)

    if (sessionCookie) {
        const payload = decodeToken(sessionCookie.tokenSet.accessToken)

        if (payload.sub) {
            const user = JSON.parse(payload.sub)
            if (isUserWithRole(user)) return user
        }
    }
    return null
}