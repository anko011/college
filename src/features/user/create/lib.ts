import {CreateUserDto} from "@/entities/user";
import {CreateUserForm} from "./ui";

export const mapToCreateUserDto = (values: CreateUserForm): CreateUserDto => ({
    ...values,
    roleId: parseInt(values.roleId),
})