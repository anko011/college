import {SessionConfig} from "./types";

export function getSessionConfig(): SessionConfig {
    return {
        sessionCookieName: 'session'
    }
}