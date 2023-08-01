import {CreateUserDto} from "@/entities/user";

export const createUser = async (dto: CreateUserDto) => {
    return await fetch('/api/admin/create-user', {
        method: 'POST',
        body: JSON.stringify(dto)
    })
}