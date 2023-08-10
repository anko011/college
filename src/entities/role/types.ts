import {Permission} from "@/entities/permission/@x";

export interface Role {
    id: number
    name: string
    systemName: string
}

export interface RolesPage {
    count: number
    roles: RoleWithPermissions[]
}

export interface RoleWithPermissions extends Role {
    permissions: Permission[]
}


export interface CreateRoleDto {
    name: string
    systemName: string
    permissionIds: number[]
}

export interface UpdateRoleDto {
    id: number
    name: string
    systemName: string
    permissionIds: number[]
}

export interface SearchRoleDto {
    name?: string
}