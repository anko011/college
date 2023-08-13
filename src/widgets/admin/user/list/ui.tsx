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

    const handleChangePage = (newPage: number) => pagination.setPage(newPage - 1)

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
                                <EditUserButton user={user}/>
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
                    value={pagination.getCurrentPage() + 1}
                    onChange={handleChangePage}
                    position="center"
                />
            )}

        </Stack>
    )
}