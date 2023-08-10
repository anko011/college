import {UpdateRoleDto} from "@/entities/role";
import {EditRoleForm} from "@/features/role";
import {createSystemName} from "@/features/role/common";

export const mapToUpdateRoleDto = (roleId: number, values: EditRoleForm): UpdateRoleDto => ({
    id: roleId,
    name: values.name,
    permissionIds: values.permissionIds.map(value => parseInt(value)),
    systemName: createSystemName(values.name)
})