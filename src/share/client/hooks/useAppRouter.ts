import {NextRouter, useRouter} from "next/router";

interface AppRouter extends NextRouter {
    updateQuery(name: string, value: string): Promise<boolean>

    safeReload(): Promise<boolean>
}

export const useAppRouter = (): AppRouter => {
    const router = useRouter()
    return {
        ...router,
        updateQuery(name: string, value: string) {
            return this.push({
                pathname: this.pathname,
                query: {
                    ...this.query,
                    [name]: value
                }
            })
        },
        safeReload() {
            return this.replace(this.asPath)
        }
    }
}