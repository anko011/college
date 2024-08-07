import {NextApiRequest, NextApiResponse} from "next";
import {fetcher, getBackendHTTPConfig} from "@/share/lib/apiService";

const {origin} = getBackendHTTPConfig()


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const code = req.query.code
        const userId = req.query.state
        if (!code || typeof code !== 'string') throw new Error()

        const response = await fetcher(`${origin}/yandex-disk/generate-token?code=${code}&userId=${userId}`, {
            method: 'GET',
        })

        if (response.ok) {
            return res.redirect('/admin/files')
        }

        return res.redirect('/admin')
    }
}

export default handler