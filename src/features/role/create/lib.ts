import {useBaseRoleForm} from "@/entities/role/client";
import {CreateRoleDto} from "@/entities/role";

export const mapToCreateRoleDto = (values: ReturnType<typeof useBaseRoleForm>['values']): CreateRoleDto => ({
    name: values.name,
    permissionIds: values.permissionIds.map(id => parseInt(id))
})