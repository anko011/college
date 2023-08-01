export interface AuthBackendConfig {
    authHeaderName: string
    authTokenName: string
}

export interface Credentials {
    login: string
    password: string
}

export interface DataResponseNotOk {
    message?: string
}