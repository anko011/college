export interface AuthBackendConfig {
    authHeaderName: string
    authTokenName: string
}

export interface Credentials {
    login: string
    password: string
}

export interface BodyWithMessage {
    message: string
}

export interface BackendResponse<T> extends Response {
    json(): Promise<T>
}