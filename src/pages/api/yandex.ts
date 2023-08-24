import {NextApiRequest, NextApiResponse} from "next";
import {fetcher, getBackendHTTPConfig} from "@/share/lib/apiService";
import {NextResponse} from "next/server";

const {origin} = getBackendHTTPConfig()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const code = req.query.code
        if (!code || typeof code !== 'string') throw new Error()

        const response = await fetcher(`${origin}/yandex-disk/generate-token?code=${code}`, {
            method: 'GET',
        })

        if (response.ok) {
            return NextResponse.redirect('/admin/files')
        }

        return NextResponse.redirect('/admin')
    }
}

export default handler