import {CreateUserDto} from "@/entities/user";
import {CreateUserForm} from "./index";

export const mapToCreateUserDto = (values: CreateUserForm): CreateUserDto => ({
    ...values,
    roleId: parseInt(values.roleId),
})