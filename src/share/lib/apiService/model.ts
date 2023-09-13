import {BackendResponse, PaginatedData, SuccessBackendResponse} from "@/share/lib/apiService/types";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {isPaginatedData} from "@/share/lib/apiService/lib";

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number
    ) {
        super(message);
    }
}

export const fetcher = <T>(...args: Parameters<typeof fetch>) => fetch(...args) as Promise<BackendResponse<T>>


export const withRisingError = <T, A extends any[]>(fetcher: (...args: A) => Promise<BackendResponse<T>>) =>
    async (...args: A): Promise<SuccessBackendResponse<T>> => {
        const response = await fetcher(...args)
        if (!response.ok) {
            const error = await response.json()
            throw new AppError(error.detail, response.status)
        }

        return response
    }

export const withCheckData = <T extends object, A extends any[]>(successFetcher: (...args: A) => Promise<SuccessBackendResponse<T>>, predicate: (obj: unknown) => obj is T extends PaginatedData<infer I> ? I : T extends (infer I)[] ? I : T) =>
    async (...args: A): Promise<T> => {
        const response = await successFetcher(...args)
        const data = await response.json()

        if (isPaginatedData(data) && data.data.every(predicate)) return data
        if (Array.isArray(data) && data.every(predicate)) return data
        if (typeof data === 'object' && predicate(data)) return data
        throw new AppError(`${response.url}: Получен неверный формат сущности`, response.status)
    }

export const withHandleError = (getServerSideProps: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    try {
        return await getServerSideProps(ctx)
    } catch (error) {
        if (!(error instanceof AppError)) throw error

        if (error.statusCode === 401) return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

        throw error
    }
}




