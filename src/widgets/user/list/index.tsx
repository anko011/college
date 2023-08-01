import {Box, Group, Pagination, Table, Text} from "@mantine/core";
import {DeleteUserButton, EditUserButton} from "@/features/user";
import {UserTableHeader, UserTableRow} from "@/entities/user/client";
import {getUsersPageFromQuery, UserWithRole} from "@/entities/user";
import {Role} from "@/entities/role";
import {useRouter} from "next/router";

interface UserListWidgetProps {
    users: UserWithRole[]
    roles: Role[]
}

export function UserListWidget({users, roles}: UserListWidgetProps) {
    const router = useRouter()
    const page = getUsersPageFromQuery(router.query)

    const handleChangePage = (newPage: number) => {
        router.push({
            pathname: '/admin/users',
            query: {
                ...router.query,
                usersPage: newPage - 1
            }
        })
    }

    return (
        <Box>
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
            <Pagination mt="md" total={2} position="center" value={(page ?? 0) + 1} onChange={handleChangePage}/>
        </Box>
    )
}