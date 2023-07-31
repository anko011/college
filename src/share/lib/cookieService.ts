import {GetServerSidePropsContext} from "next";
import {NextRequest} from "next/server";
import {RequestCookies, ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {HeadersAdapter} from "next/dist/server/web/spec-extension/adapters/headers";

export function getRequestCookie(req: GetServerSidePropsContext['req'] | NextRequest): RequestCookies {
    if (req instanceof NextRequest) return req.cookies

    const headers = new HeadersAdapter(req.headers)
    return new RequestCookies(headers)
}

export function createCookie(){
    const header = new Headers()
    return new ResponseCookies(header)
}