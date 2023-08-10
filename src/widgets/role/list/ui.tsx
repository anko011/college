import {Group, Pagination, Stack, Table, Text} from "@mantine/core";
import {DeleteRoleButton, EditRoleButton, SearchRoleForm} from "@/features/role";
import {RoleTableHeader, RoleTableRow} from "@/entities/role/client";
import {PermissionRowIcons} from "@/entities/permission/client";
import {useRoles} from "@/entities/role/client/hooks";
import {useAppRouter} from "@/share/client/hooks";
import {getRolesPageFromQuery} from "./model";
import {getRolesListConfig} from "./config";
import {getRolesListDictionary} from "@/widgets/role/list/i18n";

interface RolesListProps {
    totalCountRolePages: number
}

const {queryPageKey} = getRolesListConfig()
const rolesListDictionary = getRolesListDictionary('ru')

export const RolesList = ({totalCountRolePages}: RolesListProps) => {
    const roles = useRoles()
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
                    <Text key={1}>{rolesListDictionary.table.permissions}</Text>,

                    <Group key={2} position="right">
                        <Text>{rolesListDictionary.table.control}</Text>
                    </Group>
                ]}/>

                <tbody>
                {roles.map((role) => (
                    <RoleTableRow
                        key={role.id}
                        name={role.name}
                        actions={[
                            <Group key={3}>
                                <PermissionRowIcons permissions={role.permissions}/>
                            </Group>,

                            <Group key={4} position="right">
                                <EditRoleButton role={role}/>
                                <DeleteRoleButton roleId={role.id}/>
                            </Group>
                        ]}
                    />
                ))}
                </tbody>
            </Table>

            {totalCountRolePages > 0 && (
                <Pagination
                    total={totalCountRolePages}
                    value={(page ?? 0) + 1}
                    onChange={handleChangePage}
                    position="center"
                />
            )}

        </Stack>
    )
}