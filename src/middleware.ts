import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {EncodedSession, getEncodedSession, updateSessionCookie} from "@/share/lib/sessionService";
import {getUserWithRoleFromTokenSet} from "@/entities/user";

const ADMIN_ROLE = 'ROLE_ADMIN'

const withCookie = (res: NextResponse, cookie: ResponseCookie) => {
    const response = res
    res.cookies.set(cookie)
    return response
}

const isAdminPath = (req: NextRequest) => req.nextUrl.pathname.startsWith('/admin')
const isLoginPage = (req: NextRequest) => req.nextUrl.pathname.startsWith(('/admin/login'))

const redirectToHomePage = (req: NextRequest) => NextResponse.redirect(new URL('/', req.url),)

const next = NextResponse.next

const adminPathsGuard = (request: NextRequest, session: EncodedSession | null): NextResponse => {
    if (session) {
        if (isAdminPath(request)) {

            if (isLoginPage(request)) return next()

            const user = getUserWithRoleFromTokenSet(session.tokenSet)
            if (!user) return redirectToHomePage(request)

            if (user.role.name === ADMIN_ROLE) return next()
        }
    }

    if (isLoginPage(request)) return next()
    if (isAdminPath(request)) return redirectToHomePage(request)

    return next()
}


export async function middleware(request: NextRequest) {
    const session = getEncodedSession(request)
    const response = adminPathsGuard(request, session)

    if (session) {
        const sessionCookie = await updateSessionCookie(session)
        return withCookie(response, sessionCookie)
    }

    return response
}