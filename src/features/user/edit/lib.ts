import {UpdateUserDto} from "@/entities/user";
import {EditUserForm} from "./index";

export const mapToUpdateUserDto = (userId: number, values: EditUserForm): UpdateUserDto => ({
    ...values,
    id: userId,
    roleId: parseInt(values.roleId),
    password: values.password === '' ? null : values.password,
})
