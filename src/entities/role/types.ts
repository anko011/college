import {Permission} from "@/entities/permission/@x";

export interface Role {
    id: number
    name: string
}

export interface RoleWithPermissions extends Role {
    permissions: Permission[]
}