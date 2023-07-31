export interface BackendHTTPConfig {
    host?: string
    port?: string
    protocol?: string
    origin: string
    nextSelfOrigin: string
}


export function getBackendHTTPConfig(): BackendHTTPConfig {
    const host = process.env.BACKEND_HOST
    const port = process.env.BACKEND_PORT
    const protocol = process.env.BACKEND_PROTOCOL
    const origin = `${protocol}://${host}:${port}`
    const nextSelfOrigin = 'http://localhost:3000'
    return {host, port, protocol, origin, nextSelfOrigin}
}