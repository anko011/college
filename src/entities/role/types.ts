import {Permission} from "@/entities/permission/@x";

export interface Role {
    id: number
    name: string
}

export interface RoleWithPermissions extends Role {
    permissions: Permission[]
}

export interface BaseRoleDto {
    name: string
    permissionIds: number[]
}

export interface CreateRoleDto extends BaseRoleDto {
}

export interface UpdateRoleDto extends BaseRoleDto {
    id: number
}

export interface SearchRoleDto {
    name: string
}