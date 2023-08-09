import {NextRouter, useRouter} from "next/router";

interface AppRouter extends NextRouter {
    updateQuery(name: string, value: string): Promise<boolean>

    updateQueries(object: { [key: string]: string }): Promise<boolean>

    safeReload(): Promise<boolean>
}

const removeEmptyQuery = (params: URLSearchParams, name: string, value: string) => {
    if (!value || value === '') {
        params.delete(name)
    } else {
        params.set(name, value)
    }
}


export const useAppRouter = (): AppRouter => {
    const router = useRouter()
    return {
        ...router,
        updateQuery(name: string, value: string) {
            const params = new URLSearchParams(this.query as Record<string, string>)
            removeEmptyQuery(params, name, value)
            return this.replace({
                pathname: this.pathname,
                query: params.toString()
            })
        },
        updateQueries(queries) {
            const params = new URLSearchParams(this.query as Record<string, string>)

            Object.entries(queries).forEach(([name, value]) => {
                removeEmptyQuery(params, name, value)
            })

            return this.replace({
                pathname: this.pathname,
                query: params.toString()
            })
        },
        safeReload() {
            return this.replace(this.asPath)
        }
    }
}