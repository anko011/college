import {Group, Pagination, Stack, Table, Text} from "@mantine/core";
import {UserTableHeader, UserTableRow} from "@/entities/user/client";
import {getUserConfig, getUsersPageFromQuery, UserWithRole} from "@/entities/user";
import {Role} from "@/entities/role";
import {DeleteUserButton, EditUserButton, UserSearchForm} from "@/features/user";
import {useAppRouter} from "@/share/client/hooks";

interface UserListWidgetProps {
    users: UserWithRole[]
    roles: Role[]
    totalCountPages: number
}

const {queryPageKey} = getUserConfig()

export function UserListWidget({users, roles, totalCountPages}: UserListWidgetProps) {
    const router = useAppRouter()
    const page = getUsersPageFromQuery(router.query)

    const handleChangePage = (newPage: number) => {
        router.updateQuery(queryPageKey, (newPage - 1).toString())
    }

    return (
        <Stack>
            <UserSearchForm/>
            <Table>
                <UserTableHeader actionTitles={[
                    <Group key={1} position="right">
                        <Text>Управление</Text>
                    </Group>
                ]}/>
                <tbody>
                {users.map((user) => (
                    <UserTableRow
                        key={user.id}
                        login={user.login}
                        firstName={user.firstName}
                        secondName={user.secondName}
                        patronymic={user.patronymic}
                        actions={[
                            <Group key={1} position="right">
                                <EditUserButton user={user} roles={roles}/>
                                <DeleteUserButton userId={user.id}/>
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