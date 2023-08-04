import {NextApiRequest, NextApiResponse} from "next";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {createDeletingSessionCookie} from "@/share/lib/sessionService";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const deletingCookie = createDeletingSessionCookie()
    const cookies = new ResponseCookies(new Headers())
    cookies.set(deletingCookie)

    if (req.method === 'POST') {
        return res
            .status(200)
            .setHeader('Set-Cookie', cookies.toString())
            .json({message: 'Вы были успешно вышли из системы'})
    }
    return res.status(400).json({message: `Не поддерживаемый метод ${req.method}`})
}
