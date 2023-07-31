import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.appendHeader('Set-Cookie', 'test=123;')
    return res.status(200).end()
}