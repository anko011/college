import {useBaseUserForm} from "@/entities/user/client";
import {CreateUserDto} from "@/entities/user";

export const mapToCreateUserDto = (values: ReturnType<typeof useBaseUserForm>['values']): CreateUserDto => ({
    ...values,
    roleId: parseInt(values.roleId),
})