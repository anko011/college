import {isRole} from '@/entities/role/@x'
import {User, UserWithRole} from "./types";


export function isUser(obj: unknown): obj is User {
    return (
        typeof obj === 'object' && !!obj &&
        'id' in obj && typeof obj.id === 'number' &&
        'firstName' in obj && typeof obj.firstName === 'string' &&
        'secondName' in obj && typeof obj.secondName === 'string' &&
        'patronymic' in obj && typeof obj.patronymic === 'string' &&
        'login' in obj && typeof obj.login === 'string')
}


export function isUserWithRole(obj: unknown): obj is UserWithRole {
    return (
        isUser(obj) && 'role' in obj && isRole(obj.role)
    )
}

