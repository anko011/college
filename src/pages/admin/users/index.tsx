import {InferGetServerSidePropsType} from "next";
import {Tabs} from "@mantine/core";
import {getPaginationUsersListQuery, getUsersListDictionary, UsersListWidget, withAdminLayout} from "@/widgets/admin";
import {UserCreateForm} from "@/features/user";
import {fetchUsers} from "@/entities/user";
import {fetchAllRoles} from "@/entities/role";
import {RolesContext} from "@/entities/role/client";
import {UsersContext} from "@/entities/user/client";
import {useAppRouter} from "@/share/client/hooks";
import {getCreateUserDictionary} from "@/features/user/create";
import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {getSearchUsersQuery} from "@/features/user/search/model";
import {ParsedUrlQuery} from "querystring";
import {splitQuery} from "@/share/lib/queryService";

export const getUsersPageConfig = () => ({
    limitUsers: 10,
    tabsQueryKey: 'activeTab',
    createUserQueryKey: 'createUser',
    listUsersQueryKey: 'listUsers'
})

const usersPageConfig = getUsersPageConfig()
const usersListDictionary = getUsersListDictionary('ru')
const createUserDictionary = getCreateUserDictionary('ru')

const getFetchUsersQuery = (query: ParsedUrlQuery) => {
    const searchQueries = getSearchUsersQuery(query)
    const paginationUsersListQuery = getPaginationUsersListQuery(query)
    return splitQuery(searchQueries, paginationUsersListQuery)
}

export const getServerSideProps = appGetServerSideProps(async ({req, query, user}) => {
    const usersQuery = getFetchUsersQuery(query)

    const userPage = await fetchUsers(usersQuery, req)
    const rolesPage = await fetchAllRoles(req)

    return {
        props: {userPage, rolesPage, user}
    }

})

function AdminUsersPage({userPage, rolesPage}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useAppRouter()
    const handleTabChange = (value: string) => router.updateQuery(usersPageConfig.tabsQueryKey, value)

    const totalCountPages = Math.ceil(userPage.count / usersPageConfig.limitUsers)


    return (
        <UsersContext.Provider value={userPage.users}>
            <RolesContext.Provider value={rolesPage.roles}>
                <Tabs
                    value={router.query.activeTab as string ?? usersPageConfig.createUserQueryKey}
                    onTabChange={handleTabChange}
                >
                    <Tabs.List grow mb="md">
                        <Tabs.Tab value={usersPageConfig.createUserQueryKey}>
                            {createUserDictionary.title}
                        </Tabs.Tab>

                        <Tabs.Tab value={usersPageConfig.listUsersQueryKey}>
                            {usersListDictionary.title}
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={usersPageConfig.createUserQueryKey}>
                        <UserCreateForm/>
                    </Tabs.Panel>

                    <Tabs.Panel value={usersPageConfig.listUsersQueryKey}>
                        <UsersListWidget totalCountPages={totalCountPages}/>
                    </Tabs.Panel>
                </Tabs>

            </RolesContext.Provider>
        </UsersContext.Provider>
    )

}

export default withAdminLayout(AdminUsersPage)
