import {Group, Pagination, Stack, Table, Text} from "@mantine/core";
import {DeleteRoleButton, EditRoleButton, SearchRoleForm} from "@/features/role";
import {getRoleConfig, getRolesPageFromQuery, RoleWithPermissions} from "@/entities/role";
import {Permission} from "@/entities/permission";
import {RoleTableHeader, RoleTableRow} from '@/entities/role/client'
import {PermissionRowIcons} from "@/entities/permission/client";
import {useAppRouter} from "@/share/client/hooks";

interface RoleListWidgetProps {
    totalCountPages: number
    permissions: Permission[]
    roles: RoleWithPermissions[]
}

const {queryPageKey} = getRoleConfig()

export const RoleListWidget = ({roles, totalCountPages, permissions}: RoleListWidgetProps) => {
    const router = useAppRouter()
    const page = getRolesPageFromQuery(router.query)

    const handleChangePage = async (newPage: number) => {
        await router.updateQuery(queryPageKey, (newPage - 1).toString())
    }

    return (
        <Stack>
            <SearchRoleForm/>
            <Table>
                <RoleTableHeader actionTitles={[
                    <Text key={1}>Права</Text>,
                    <Group key={2} position="right">
                        <Text>Управление</Text>
                    </Group>
                ]}/>
                <tbody>
                {roles.map((role) => (
                    <RoleTableRow
                        key={role.id}
                        name={role.name}
                        actions={[
                            <Group key={1}>
                                <PermissionRowIcons permissionsIds={role.permissions.map(permission => permission.id)}/>
                            </Group>,
                            <Group key={2} position="right">
                                <EditRoleButton role={role} permissions={permissions}/>
                                <DeleteRoleButton roleId={role.id}/>
                            </Group>
                        ]}
                    />
                ))}
                </tbody>
            </Table>
            {totalCountPages > 0 && (
                <Pagination
                    total={totalCountPages}
                    value={(page ?? 0) + 1}
                    onChange={handleChangePage}
                    position="center"
                />
            )}

        </Stack>
    )
}