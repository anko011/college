import type {NextMiddleware, NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getUserWithRoleFromTokenSet} from "@/entities/user";
import {withAuthMiddleware} from "@/share/lib/authService";
import {getEncodedSession} from "@/share/lib/sessionService";
import {isExpiredToken} from "@/share/lib/tokenService";

const ADMIN_ROLE = 'ROLE_ADMIN'

const isAdminPath = (req: NextRequest) => req.nextUrl.pathname.startsWith('/admin')
const isLoginPage = (req: NextRequest) => req.nextUrl.pathname.startsWith(('/admin/login'))

const redirectToLoginPage = (req: NextRequest) => NextResponse.redirect(new URL('/admin/login', req.url))
const redirectToHomePage = (req: NextRequest) => NextResponse.redirect(new URL('/', req.url))

const withAdminGuard = (middleware: NextMiddleware): NextMiddleware => async (request, event) => {
    if (isAdminPath(request) && !isLoginPage(request)) {
        const session = getEncodedSession(request)
        if (!session) return redirectToLoginPage(request)
        if (isExpiredToken(session.tokenSet.accessToken)) return redirectToLoginPage(request)

        const user = getUserWithRoleFromTokenSet(session.tokenSet)
        if (!user || user.role.systemName !== ADMIN_ROLE) return redirectToHomePage(request)
    }

    return middleware(request, event);
}

async function middleware(_: NextRequest) {
    return NextResponse.next()
}

export default withAdminGuard(withAuthMiddleware(middleware))
