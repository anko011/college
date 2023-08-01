import {Title} from "@mantine/core";
import {Role} from "@/entities/role";
import {UserCreateForm} from "@/features/user";

interface CreateUserWidgetProps {
    roles: Role[]

}

export function UserCreateWidget({roles}: CreateUserWidgetProps) {


    return (
        <>
            <Title order={4} mb="md">Создание пользователя</Title>
            <UserCreateForm roles={roles}/>
        </>
    )
}