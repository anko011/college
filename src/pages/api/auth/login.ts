import {NextApiRequest, NextApiResponse} from "next";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {createCreatingSessionCookie, createEncodedSession} from "@/share/lib/sessionService";
import {isTokenSet} from "@/share/lib/tokenService";
import {authenticateByCredentials} from "@/share/lib/authService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const response = await authenticateByCredentials(req.body)

        if (!response.ok) return res
            .status(response.status)
            .send(await response.json())

        const tokenSet = await response.json()
        if (!isTokenSet(tokenSet)) throw new Error('Получен некорректный формат токенов')

        const encodedSession = createEncodedSession(tokenSet)
        const sessionCookie = createCreatingSessionCookie(encodedSession)

        const cookies = new ResponseCookies(new Headers())
        cookies.set(sessionCookie)

        return res
            .status(response.status)
            .setHeader('Set-Cookie', cookies.toString())
            .json({
                message: 'Авторизация прошла успешно'
            })
    }

    return res.status(400).json({message: `Метод ${req.method} не поддерживается`})
}
