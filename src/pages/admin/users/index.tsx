import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {Tabs} from "@mantine/core";
import {withAdminLayout} from "@/widgets/layout";
import {getUsersPageFromQuery, UsersListWidget} from "@/widgets/user";
import {UserCreateForm} from "@/features/user";
import {createSearchUserDto, fetchUsers} from "@/entities/user";
import {fetchRoles} from "@/entities/role";
import {RolesContext} from "@/entities/role/client";
import {UsersContext} from "@/entities/user/client";
import {Locale} from "@/share/lib/i18nService";
import {withHandleError} from "@/share/lib/apiService";
import {useAppRouter} from "@/share/client/hooks";

const RU_DICTIONARY = {
    tabs: {
        createUser: 'Создание пользователя',
        listUsers: 'Список пользователей'
    }
}

const mapper = {
    'ru': RU_DICTIONARY
}

export const getUsersPageDictionary = (locale: Locale) => {
    return mapper[locale]
}

export const getUsersPageConfig = () => ({
    limitUsers: 10,
    tabsQueryKey: 'activeTab',
    createUserQueryKey: 'createUser',
    listUsersQueryKey: 'listUsers'
})

const usersPageConfig = getUsersPageConfig()
const usersPageDictionary = getUsersPageDictionary('ru')

export const getServerSideProps = withHandleError(async ({req, query}: GetServerSidePropsContext) => {
    const usersNumPage = getUsersPageFromQuery(query)
    const searchQuery = createSearchUserDto(query)
    const userPage = await fetchUsers(usersNumPage, usersPageConfig.limitUsers, searchQuery, req)

    const rolesPage = await fetchRoles(0, undefined, req)

    return {
        props: {userPage, rolesPage}
    }

})

function AdminUsersPage({userPage, rolesPage}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useAppRouter()
    const handleTabChange = (value: string) => router.updateQuery(usersPageConfig.tabsQueryKey, value)

    const totalCountPages = Math.ceil(userPage.count / usersPageConfig.limitUsers)

    return (
        <UsersContext.Provider value={userPage.users}>
            <RolesContext.Provider value={rolesPage.roles}>

                <Tabs value={router.query.activeTab as string ?? usersPageConfig.createUserQueryKey}
                      onTabChange={handleTabChange}
                >
                    <Tabs.List grow mb="md">
                        <Tabs.Tab value={usersPageConfig.createUserQueryKey}>
                            {usersPageDictionary.tabs.createUser}
                        </Tabs.Tab>

                        <Tabs.Tab value={usersPageConfig.listUsersQueryKey}>
                            {usersPageDictionary.tabs.listUsers}
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
