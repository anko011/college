import {useBaseUserForm} from "@/entities/user/client";
import {UpdateUserDto} from "@/entities/user";

export const mapToUpdateUserDto = (userId: number, values: ReturnType<typeof useBaseUserForm>['values']): UpdateUserDto => ({
    ...values,
    id: userId,
    roleId: parseInt(values.roleId),
    password: values.password === '' ? null : values.password,
})
