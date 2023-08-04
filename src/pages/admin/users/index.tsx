import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {Tabs} from "@mantine/core";
import {withAdminLayout} from "@/widgets/layout";
import {UserListWidget} from "@/widgets/user";
import {UserCreateForm} from "@/features/user";
import {fetchUsers, getUsersPageFromQuery} from "@/entities/user";
import {fetchRoles} from "@/entities/role";
import {parseResponseOrError} from "@/share/lib/apiService";
import {useAppRouter} from "@/share/client/hooks";


export async function getServerSideProps({req, query}: GetServerSidePropsContext) {
    const usersNumPage = getUsersPageFromQuery(query)
    const userPage = await parseResponseOrError(fetchUsers(usersNumPage, req))

    const roles = await parseResponseOrError(fetchRoles(0, req))

    return {
        props: {userPage, roles}
    }

}

function AdminUsersPage({userPage, roles}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useAppRouter()
    const handleTabChange = (value: string) => router.updateQuery('activeTab', value)

    return (
        <>
            <Tabs value={router.query.activeTab as string ?? 'createUser'} onTabChange={handleTabChange}>
                <Tabs.List grow mb="md">
                    <Tabs.Tab value="createUser">Создание пользователя</Tabs.Tab>
                    <Tabs.Tab value="userList">Список пользователей</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="createUser">
                    <UserCreateForm roles={roles}/>
                </Tabs.Panel>
                <Tabs.Panel value="userList">
                    <UserListWidget users={userPage.users} roles={roles}/>
                </Tabs.Panel>
            </Tabs>

        </>
    )

}

export default withAdminLayout(AdminUsersPage)
