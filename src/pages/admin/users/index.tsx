import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {Tabs} from "@mantine/core";
import {withAdminLayout} from "@/widgets/layout";
import {UserListWidget} from "@/widgets/user";
import {UserCreateForm} from "@/features/user";
import {createSearchUserDto, fetchUsers, getUsersPageFromQuery} from "@/entities/user";
import {fetchRoles} from "@/entities/role";
import {useAppRouter} from "@/share/client/hooks";
import {withHandleError} from "@/share/lib/apiService";

const LIMIT_USERS = 10


export const getServerSideProps = withHandleError(async ({req, query}: GetServerSidePropsContext) => {
    const usersNumPage = getUsersPageFromQuery(query)
    const searchQuery = createSearchUserDto(query)
    const userPage = await fetchUsers(usersNumPage, LIMIT_USERS, searchQuery, req)
    const roles = await fetchRoles(0, req)

    return {
        props: {userPage, roles}
    }

})

function AdminUsersPage({userPage, roles}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useAppRouter()
    const handleTabChange = (value: string) => router.updateQuery('activeTab', value)

    const totalCountPages = Math.ceil(userPage.count / LIMIT_USERS)

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
                    <UserListWidget users={userPage.users} roles={roles} totalCountPages={totalCountPages}/>
                </Tabs.Panel>
            </Tabs>
        </>
    )

}

export default withAdminLayout(AdminUsersPage)
