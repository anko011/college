import {Role} from "@/entities/role/@x";

export interface User {
    id: number
    patronymic: string
    login: string
    firstName: string
    secondName: string
    password: string
}

export interface UserPage {
    count: number
    users: UserWithRole[]
}

export interface UserWithRole extends User {
    role: Role
}

export type BaseUserDto = Omit<User, 'id'> & {
    roleId: number
}

export type CreateUserDto = BaseUserDto

export type UpdateUserDto = Omit<BaseUserDto, 'password'> & {
    id: number
    password: string | null
}


