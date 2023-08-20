type HTTPResponseStatus = 200 | 201 | 400 | 401 | 403

export interface BodyWithMessage {
    message: string
}

export interface SuccessBackendResponse<T extends object> extends Response {
    status: 200 | 201
    ok: true

    json(): Promise<T>
}

export interface BackendErrorMessage {
    message: string
}

export interface ErrorBackendResponse extends Response {
    status: Exclude<HTTPResponseStatus, 200 | 201>
    ok: false

    json(): Promise<BackendErrorMessage>
}

export type BackendResponse<T extends object> = ErrorBackendResponse | SuccessBackendResponse<T>

export interface PaginatedData<T extends object> {
    data: T[]
    pagination: {
        countPages: number
        currentPage: number
        hasNextPage: boolean
        hasPrevPage: boolean
    },
}