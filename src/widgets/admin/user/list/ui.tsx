import {Group, Pagination, Stack, Table, Text} from "@mantine/core";
import {UserTableHeader, UserTableRow} from "@/entities/user/client";
import {DeleteUserButton, EditUserButton, UserSearchForm} from "@/features/user";
import {useAppRouter} from "@/share/client/hooks";
import {useUsers} from "@/entities/user/client/hooks";

import {getUsersListConfig} from "./config";
import {getUsersPageFromQuery} from "./model";

interface UsersListWidgetProps {
    totalCountPages: number
}

const {queryPageKey} = getUsersListConfig()

export function UsersListWidget({totalCountPages}: UsersListWidgetProps) {
    const router = useAppRouter()
    const page = getUsersPageFromQuery(router.query)
    const users = useUsers()

    const handleChangePage = async (newPage: number) => {
        await router.updateQuery(queryPageKey, (newPage - 1).toString())
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
                    value={(page ?? 0) + 1}
                    onChange={handleChangePage}
                    position="center"
                />
            )}

        </Stack>
    )
}