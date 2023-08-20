import {Group, Pagination, Stack, Table, Text} from "@mantine/core";
import {DeleteUserButton, EditUserButton, UserSearchForm} from "@/features/user";
import {UserTableHeader, UserTableRow, useUsers} from "@/entities/user/client";
import {useUsersListPagination} from "./model";

interface UsersListWidgetProps {
    totalCountPages: number
}


export function UsersListWidget({totalCountPages}: UsersListWidgetProps) {
    const users = useUsers()
    const pagination = useUsersListPagination()

    return (
        <Stack>
            <UserSearchForm/>
            <Table>
                <UserTableHeader
                    before={(render) => (
                        <>
                            {render(
                                <Group position="center">
                                    <Text>Роль</Text>
                                </Group>
                            )}
                            {render(
                                <Group position="right">
                                    <Text>Управление</Text>
                                </Group>
                            )}
                        </>
                    )}
                />
                <tbody>
                {users.map((user) => (
                    <UserTableRow
                        key={user.id}
                        user={user}
                        before={(render) => (
                            <>
                                {render(
                                    <Group position="center">
                                        <Text>{user.role.name}</Text>
                                    </Group>
                                )}
                                {render(
                                    <Group position="right">
                                        <EditUserButton user={user}/>
                                        <DeleteUserButton userId={user.id}/>
                                    </Group>
                                )}
                            </>
                        )}
                    />
                ))}
                </tbody>
            </Table>
            {totalCountPages > 0 && (
                <Pagination
                    total={totalCountPages}
                    value={pagination.getCurrentPage()}
                    onChange={pagination.setPage}
                    position="center"
                />
            )}

        </Stack>
    )
}