type HTTPResponseStatus = 200 | 201 | 400 | 401 | 403

export interface SuccessBackendResponse<T> extends Response {
    status: 200 | 201
    ok: true

    json(): Promise<T>
}

interface ErrorDetail {
    title: string
    detail: string
    status: number
}

export interface ErrorBackendResponse extends Response {
    status: Exclude<HTTPResponseStatus, 200 | 201>
    ok: false

    json(): Promise<ErrorDetail>
}

export type BackendResponse<T = void> = ErrorBackendResponse | SuccessBackendResponse<T>

export interface PaginatedData<T extends object> {
    data: T[]
    pagination: {
        countPages: number
        currentPage: number
        hasNextPage: boolean
        hasPrevPage: boolean
    },
}