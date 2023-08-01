import {NextApiRequest, NextApiResponse} from "next";
import {HeadersAdapter} from "next/dist/server/web/spec-extension/adapters/headers";
import {withAuthRequest} from "@/share/api";
import {getBackendHTTPConfig} from "@/share/config";

const {origin} = getBackendHTTPConfig()

const REPLACE_SLUG = '/api'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const headers = new HeadersAdapter(req.headers)

    if (!req.url) throw new Error('Не существует url')

    const slug = req.url.slice(req.url.search(REPLACE_SLUG) + REPLACE_SLUG.length)
    const url = `${origin}${slug}`

    const body = req.body.length ? req.body : undefined

    const request = new Request(url, {
        method: req.method,
        body,
        headers
    })

    const response = await fetch(withAuthRequest(request, req))
    return res.status(response.status).json(await response.json())
}