import {InferGetServerSidePropsType} from "next";
import {Tabs} from "@mantine/core";
import {getPaginationRolesListQuery, RolesList, withAdminLayout} from "@/widgets/admin";
import {RoleCreateForm} from "@/features/role";
import {fetchPermissions} from "@/entities/permission";
import {fetchRoles} from "@/entities/role";
import {RolesContext} from "@/entities/role/client";
import {PermissionContext} from "@/entities/permission/client";
import {Locale} from "@/share/lib/i18nService";
import {useAppRouter} from "@/share/client/hooks";
import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {getSearchRolesQuery} from "@/features/role/search/model";
import {splitQuery} from "@/share/lib/queryService";
import {ParsedUrlQuery} from "querystring";

const RU_DICTIONARY = {
    tabs: {
        createRole: 'Создание роли',
        listRoles: 'Список ролей'
    }
}

const mapper = {
    'ru': RU_DICTIONARY
}

export const getRolesPageDictionary = (locale: Locale) => {
    return mapper[locale]
}

export const getRolesPageConfig = () => ({
    limitRoles: 10,
    tabsQueryKey: 'activeTab',
    createRoleQueryKey: 'createRole',
    listRolesQueryKey: 'listRoles'
})

const rolesPageConfig = getRolesPageConfig()
const rolesPageDictionary = getRolesPageDictionary('ru')

const getFetchRolesQueries = (query: ParsedUrlQuery) => {
    const searchRolesQuery = getSearchRolesQuery(query)
    const paginationRolesListQuery = getPaginationRolesListQuery(query)
    return splitQuery(searchRolesQuery, paginationRolesListQuery)
}

export const getServerSideProps = appGetServerSideProps(async ({req, query, user}) => {
    const rolesQueries = getFetchRolesQueries(query)
    const rolesPage = await fetchRoles(rolesQueries, req)

    const permissions = await fetchPermissions(req)
    return {props: {rolesPage, permissions, user}}
})


const AdminRolesPage = ({rolesPage, permissions}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useAppRouter()

    const handleTabChange = (value: string) => router.updateQuery(rolesPageConfig.tabsQueryKey, value)
    const totalCountRolePages = Math.ceil(rolesPage.count / rolesPageConfig.limitRoles)

    return (
        <RolesContext.Provider value={rolesPage.roles}>
            <PermissionContext.Provider value={permissions}>

                <Tabs
                    value={router.query[rolesPageConfig.tabsQueryKey] as string ?? rolesPageConfig.createRoleQueryKey}
                    onTabChange={handleTabChange}
                >
                    <Tabs.List grow mb="md">
                        <Tabs.Tab value={rolesPageConfig.createRoleQueryKey}>
                            {rolesPageDictionary.tabs.createRole}
                        </Tabs.Tab>

                        <Tabs.Tab value={rolesPageConfig.listRolesQueryKey}>
                            {rolesPageDictionary.tabs.listRoles}
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={rolesPageConfig.createRoleQueryKey}>
                        <RoleCreateForm/>
                    </Tabs.Panel>

                    <Tabs.Panel value={rolesPageConfig.listRolesQueryKey}>
                        <RolesList totalCountRolePages={totalCountRolePages}/>
                    </Tabs.Panel>
                </Tabs>

            </PermissionContext.Provider>
        </RolesContext.Provider>
    )
}

export default withAdminLayout(AdminRolesPage)

