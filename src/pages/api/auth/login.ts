import {NextApiRequest, NextApiResponse} from "next";
import {isTokenSet} from "@/share/lib/tokenService";
import {createCreatingSessionCookie, createEncodedSession} from "@/share/lib/sessionService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const response = await fetch(`http://188.120.239.41:9991/auth/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        })


        if (!response.ok && !response.redirected) {
            const message = await response.json()
            return res
                .status(response.status)
                .json(message)
        }

        const tokenSet = await response.json()

        if (!isTokenSet(tokenSet)) return res.status(500).json({
            message: 'Не удалось авторизоваться'
        })

        const encodedUserSession = createEncodedSession(tokenSet)
        const userSessionCookie = createCreatingSessionCookie(encodedUserSession)

        return res
            .status(200)
            .setHeader('Set-Cookie', userSessionCookie.toString())
            .json({
                message: 'Вы успешно аторизованы'
            })
    }
}
