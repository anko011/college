import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {withAdminLayout} from "@/widgets/layout";
import {UserListWidget} from "@/widgets/user";
import {fetchUsers, getUsersPageFromQuery} from "@/entities/user";
import {fetchRoles} from "@/entities/role";
import {parseResponseOrError} from "@/share/api";
import {Tabs} from "@mantine/core";
import {useRouter} from "next/router";
import {UserCreateForm} from "@/features/user";


export async function getServerSideProps({req, query}: GetServerSidePropsContext) {
    const usersPage = getUsersPageFromQuery(query)

    const users = await parseResponseOrError(fetchUsers(usersPage, req))
    const roles = await parseResponseOrError(fetchRoles(0, req))

    return {
        props: {users, roles}
    }
}

function AdminUsersPage({users, roles}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const handleTabChange = (value: string) => router.push({
        pathname: '/admin/users',
        query: {
            ...router.query,
            activeTab: value
        }
    })

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
                    <UserListWidget users={users} roles={roles}/>
                </Tabs.Panel>
            </Tabs>

        </>
    )

}

export default withAdminLayout(AdminUsersPage)
