import {Permission, PermissionSystemName} from "./types";

const isSystemName = (obj: unknown): obj is PermissionSystemName => {
    return (
        typeof obj === 'string' && Object.values(PermissionSystemName).includes(obj as PermissionSystemName)
    )
}

export function isPermission(obj: unknown): obj is Permission {
    console.log(isSystemName({}))
    return (
        typeof obj === 'object' && !!obj &&
        'id' in obj && typeof obj.id === 'number' &&
        'name' in obj && typeof obj.name === 'string' &&
        'systemName' in obj && isSystemName(obj.systemName)
    )
}
