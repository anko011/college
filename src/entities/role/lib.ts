import {isPermission} from "@/entities/permission/@x";
import {Role, RolesPage, RoleWithPermissions} from "./types";


export function isRole(obj: unknown): obj is Role {
    return (
        typeof obj === 'object' && !!obj &&
        'id' in obj && typeof obj.id === 'number' &&
        'systemName' in obj && typeof obj.systemName === 'string' &&
        'name' in obj && typeof obj.name === 'string'
    )
}


export function isRoleWithPermissions(obj: unknown): obj is RoleWithPermissions {
    return (isRole(obj) && 'permissions' in obj && Array.isArray(obj.permissions)) && obj.permissions.every(isPermission)
}