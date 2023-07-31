import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getUserWithRole} from "@/entities/user";

const ADMIN_ROLE = 'ROLE_ADMIN'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin/login')) return NextResponse.next()

    const user = getUserWithRole(request)
    if (!user) return NextResponse.redirect(new URL('/', request.url))

    const {role} = user
    if (role.name === ADMIN_ROLE) return NextResponse.next()

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/admin/:path*',
}
