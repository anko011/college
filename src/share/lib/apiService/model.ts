import {BackendResponse, SuccessBackendResponse} from "@/share/lib/apiService/types";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number
    ) {
        super(message);
    }
}

export class NotAuthorizeError extends AppError {
    constructor() {
        super('Пользователь не авторизован', 401);
    }
}

export const fetcher = <T extends object>(...args: Parameters<typeof fetch>) => fetch(...args) as Promise<BackendResponse<T>>


export const withRisingError = <T extends object, A extends any[]>(fetcher: (...args: A) => Promise<BackendResponse<T>>) =>
    async (...args: A): Promise<SuccessBackendResponse<T>> => {
        const response = await fetcher(...args)
        if (!response.ok) {
            if (response.status === 401) throw new NotAuthorizeError()

            const error = await response.json()
            throw new AppError(error.message, response.status)
        }

        return response
    }

export const withCheckData = <T extends object, A extends any[]>(successFetcher: (...args: A) => Promise<SuccessBackendResponse<T>>, predicate: (obj: unknown) => obj is T extends (infer I)[] ? I : T) =>
    async (...args: A): Promise<T> => {
        const response = await successFetcher(...args)
        const data = await response.json()
        if (Array.isArray(data) && data.every(predicate)) return data
        if (typeof data === 'object' && predicate(data)) return data
        throw new AppError(`${response.url}: Получен неверный формат сущности`, response.status)
    }

export const withHandleError = (getServerSideProps: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    try {
        return await getServerSideProps(ctx)
    } catch (error) {
        if (error instanceof NotAuthorizeError) return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

        throw error
    }
}

