import {NextApiRequest, NextApiResponse} from "next";
import {createDeletingSessionCookie} from "@/share/lib/sessionService";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const deletingCookie = createDeletingSessionCookie()

    if (req.method === 'POST') {
        return res
            .status(200)
            .setHeader('Set-Cookie', deletingCookie.toString())
            .end()
    }
    return res.end()
}
