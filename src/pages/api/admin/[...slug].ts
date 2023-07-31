import {NextApiRequest, NextApiResponse} from "next";
import {fetchAllUsers} from "@/entities/user";
import {fetchAllRoles} from "@/entities/role";

type Matcher = {
    [path: string]: Function | { [query: string]: Function }
}

const matcher: Matcher = {
    'get-users': fetchAllUsers,
    'get-roles': fetchAllRoles
}

const isMatch = (path: string, query?: string) => {
    let result = Object.keys(matcher).includes(path)

    if (result && query) {
        result = Object.keys(matcher[path]).includes(query)
    }

    return result
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {slug} = req.query

    if (Array.isArray(slug)) {
        const [path, query] = slug

        if (isMatch(path, query)) {
            let loader = matcher[path]

            if (typeof loader !== 'function' && typeof loader === 'object') loader = loader[query]
            const data = await loader(req)

            return res.status(200).json(data)
        }

    }

    return res.status(200).json({a: 1})
}