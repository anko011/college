import {CreateRoleDto} from "@/entities/role";
import {CreateRoleForm} from "@/features/role";
import {createSystemName} from "@/features/role/common";


export const mapToCreateRoleDto = (values: CreateRoleForm): CreateRoleDto => ({
    name: values.name,
    permissionIds: values.permissionIds.map(id => parseInt(id)),
    systemName: createSystemName(values.name)
})