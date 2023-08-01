import {NextApiRequest, NextApiResponse} from "next";
import {withAuthRequest} from "@/share/api";
import {getBackendHTTPConfig} from "@/share/config";
import {HeadersAdapter} from "next/dist/server/web/spec-extension/adapters/headers";

const {origin} = getBackendHTTPConfig()

const REPLACE_SLUG = '/api'

const convertBody = (body: any) => {
    if (typeof body === 'object') {
        return Object.keys(body).length !== 0 ? JSON.stringify(body) : undefined
    }

    return body
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const headers = new HeadersAdapter(req.headers)
    if (!req.url) throw new Error('Не существует url')

    const slug = req.url.slice(req.url.search(REPLACE_SLUG) + REPLACE_SLUG.length)
    const url = `${origin}${slug}`

    const body = convertBody(req.body)
    headers.delete('content-length')
    const request = new Request(url, {
        method: req.method,
        body,
        headers
    })

    const response = await fetch(withAuthRequest(request, req))
    return res.status(response.status).json(await response.json())
}