import {Role} from "@/entities/role/@x";

export interface User {
    id: number
    patronymic: string
    login: string
    firstName: string
    secondName: string
}

export interface UserWithRole extends User {
    role: Role
}

export interface CreateUserDto {
    firstName: string
    secondName: string
    patronymic: string
    login: string
    password: string
    roleId: number
}

