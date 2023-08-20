import {InferGetServerSidePropsType} from "next";
import {ParsedUrlQuery} from "querystring";
import {Tabs} from "@mantine/core";
import {getPaginationUsersListQuery, getUsersListDictionary, UsersListWidget, withAdminLayout} from "@/widgets/admin";
import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {getCreateUserDictionary, UserCreateForm} from "@/features/user/create";
import {getSearchUsersQuery} from "@/features/user/search";
import {fetchUsers} from "@/entities/user";
import {fetchAllRoles} from "@/entities/role";
import {RolesContext} from "@/entities/role/client";
import {UsersContext} from "@/entities/user/client";
import {useAppRouter} from "@/share/client/hooks";
import {splitQuery} from "@/share/lib/queryService";

export const getUsersPageConfig = () => ({
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

    const paginationUsersData = await fetchUsers(usersQuery, req)
    const rolesWithPermissions = await fetchAllRoles(req)

    return {
        props: {paginationUsersData, rolesWithPermissions, user}
    }

})

function AdminUsersPage(
    {
        paginationUsersData,
        rolesWithPermissions
    }: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const router = useAppRouter()
    const handleTabChange = (value: string) => router.setQuery(usersPageConfig.tabsQueryKey, value)


    return (
        <UsersContext.Provider value={paginationUsersData.data}>
            <RolesContext.Provider value={rolesWithPermissions}>
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
                        <UsersListWidget totalCountPages={paginationUsersData.pagination.countPages}/>
                    </Tabs.Panel>
                </Tabs>

            </RolesContext.Provider>
        </UsersContext.Provider>
    )

}

export default withAdminLayout(AdminUsersPage)
