import {Permission} from "./types";

export function isPermission(obj: unknown): obj is Permission {
    return (
        typeof obj === 'object' && !!obj &&
        'id' in obj && typeof obj.id === 'number' &&
        'name' in obj && typeof obj.name === 'string')
}
