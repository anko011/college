import {AuthBackendConfig} from "./types";

export function getAuthBackendConfig(): AuthBackendConfig {
    return ({
        authHeaderName: 'Authorization',
        authTokenName: 'Bearer',
    })
}