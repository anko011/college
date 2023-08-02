import {Role} from "@/entities/role/@x";

export interface User {
    id: number
    patronymic: string
    login: string
    firstName: string
    secondName: string
    password: string
}

export interface UserWithRole extends User {
    role: Role
}

export type BaseUserDto = Omit<User, 'id'> & {
    roleId: number
}

export type CreateUserDto = BaseUserDto
export type UpdateUserDto = BaseUserDto & {
    id: number
}

