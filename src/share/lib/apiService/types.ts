export interface BodyWithMessage {
    message: string
}

export interface BackendResponse<T> extends Response {
    json(): Promise<T>
}