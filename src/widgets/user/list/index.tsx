import {Group, Table, Text, Title} from "@mantine/core";
import {DeleteUserButton, EditUserButton} from "@/features/user";
import {UserTableHeader, UserTableRow} from "@/entities/user/client";
import {UserWithRole} from "@/entities/user";
import {Role} from "@/entities/role";

interface UserListWidgetProps {
    users: UserWithRole[]
    roles: Role[]
}

export function UserListWidget({users, roles}: UserListWidgetProps) {
    return (
        <>
            <Title order={4} mb="md">Список пользователей</Title>
            {users && (
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
            )}
        </>
    )
}