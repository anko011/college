import {UpdateRoleDto} from "@/entities/role";
import {useBaseRoleForm} from "@/entities/role/client";

export const mapToUpdateRoleDto = (roleId: number, values: ReturnType<typeof useBaseRoleForm>['values']): UpdateRoleDto => ({
    id: roleId,
    name: values.name,
    permissionIds: values.permissionIds.map(permission => parseInt(permission))
})