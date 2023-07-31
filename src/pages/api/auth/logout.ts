import {NextApiRequest, NextApiResponse} from "next";
import {createDeletingSessionCookie} from "@/share/lib/sessionService";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const deletingCookie = createDeletingSessionCookie()

    const cookies = new ResponseCookies(new Headers())
    cookies.set(deletingCookie)

    if (req.method === 'POST') {
        return res
            .status(200)
            .setHeader('Set-Cookie', cookies.toString())
            .end()
    }
    return res.end()
}