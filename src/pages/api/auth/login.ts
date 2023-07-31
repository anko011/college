import {NextApiRequest, NextApiResponse} from "next";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {authenticateByCredentials} from "@/share/api";
import {createCreatingSessionCookie, createEncodedSession} from "@/share/lib/sessionService";
import {isTokenSet} from "@/share/lib/tokenService";

const isIncorrectCredentials = (response: Response) => response.status === 403

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const response = await authenticateByCredentials(req.body)

        if (isIncorrectCredentials(response)) return res.status(403).json(await response.json())

        const tokenSet = await response.json()
        if (!isTokenSet(tokenSet)) throw new Error('Получен некорректный формат токенов')

        const encodedSession = createEncodedSession(tokenSet)
        const sessionCookie = createCreatingSessionCookie(encodedSession)

        const cookies = new ResponseCookies(new Headers())
        cookies.set(sessionCookie)

        return res
            .status(200)
            .setHeader('Set-Cookie', cookies.toString())
            .json({
                message: 'Авторизация прошла успешно'
            })
    }
}
