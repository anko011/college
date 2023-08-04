import {Button, Group, Input, Pagination, Stack, Table, Text, TextInput} from "@mantine/core";
import {UserTableHeader, UserTableRow} from "@/entities/user/client";
import {getUsersPageFromQuery, UserWithRole} from "@/entities/user";
import {Role} from "@/entities/role";
import {useRouter} from "next/router";
import {DeleteUserButton, EditUserButton} from "@/features/user";

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
        <Stack>
            <Group noWrap>
                <Input.Wrapper w="100%">
                    <TextInput placeholder="Логин"/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder="Имя"/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder="Фамилия"/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder="Отчество"/>
                </Input.Wrapper>

                <Button>Поиск</Button>
            </Group>

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
            <Pagination total={2} position="center" value={(page ?? 0) + 1} onChange={handleChangePage}/>
        </Stack>
    )
}