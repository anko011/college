import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getUserWithRoleFromTokenSet} from "@/entities/user";
import {createAuthenticatedResponse, createUnauthenticatedResponse, getUpdatedTokenSet} from "@/share/lib/authService";
import {EncodedSession, getEncodedSession} from "@/share/lib/sessionService";

const ADMIN_ROLE = 'ROLE_ADMIN'

const isAdminPath = (req: NextRequest) => req.nextUrl.pathname.startsWith('/admin')
const isLoginPage = (req: NextRequest) => req.nextUrl.pathname.startsWith(('/admin/login'))
const redirectToHomePage = (req: NextRequest) => (init?: Parameters<typeof NextResponse['redirect']>[1]) => NextResponse.redirect(new URL('/', req.url), init)
const next = NextResponse.next


const adminPathsGuard = (request: NextRequest, session: EncodedSession | null) => {
    if (isLoginPage(request)) return next

    if (isAdminPath(request)) {
        if (session) {
            const user = getUserWithRoleFromTokenSet(session.tokenSet)
            if (!user) return redirectToHomePage(request)

            if (user.role.name === ADMIN_ROLE) return next
        }

        return redirectToHomePage(request)
    }

    return next
}

export type ResponseCreator = ReturnType<typeof adminPathsGuard>

export async function middleware(request: NextRequest) {
    const session = getEncodedSession(request)
    const responseCreator = adminPathsGuard(request, session)

    if (session) {
        const updatedTokenSet = await getUpdatedTokenSet(session.tokenSet)

        if (updatedTokenSet) {
            return createAuthenticatedResponse(responseCreator, request, updatedTokenSet)
        }
    }

    return createUnauthenticatedResponse(responseCreator)
}