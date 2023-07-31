import {GetServerSidePropsContext} from "next";
import {NextRequest} from "next/server";
import {RequestCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {HeadersAdapter} from "next/dist/server/web/spec-extension/adapters/headers";

export function getRequestCookies(req: GetServerSidePropsContext['req'] | NextRequest): RequestCookies {
    if (req instanceof NextRequest) return req.cookies

    const headers = new HeadersAdapter(req.headers)
    return new RequestCookies(headers)
}

