import {NextApiRequest, NextApiResponse} from "next";
import {fetchAllUsers, UserBackendRequest} from "@/entities/user";


const matcher = {
    'get-users': UserBackendRequest
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {slug} = req.query

    if (Array.isArray(slug)) {
        const [path, query] = slug

        if (path === 'get-users') {
            const data = await fetchAllUsers(req)
            return res.status(200).json(data)

        }
    }

    return res.status(200).json({a: 1})
}