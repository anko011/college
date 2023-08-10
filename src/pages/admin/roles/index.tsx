import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {Tabs} from "@mantine/core";
import {withAdminLayout} from "@/widgets/layout";
import {getRolesPageFromQuery, RolesList} from "@/widgets/role";
import {RoleCreateForm} from "@/features/role";
import {fetchPermissions} from "@/entities/permission";
import {createSearchRoleDto, fetchRoles} from "@/entities/role";
import {RolesContext} from "@/entities/role/client";
import {PermissionContext} from "@/entities/permission/client";
import {Locale} from "@/share/lib/i18nService";
import {withHandleError} from "@/share/lib/apiService";
import {useAppRouter} from "@/share/client/hooks";

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

export const getServerSideProps = withHandleError(async ({req, query}: GetServerSidePropsContext) => {
    const rolePageNumber = getRolesPageFromQuery(query)
    const searchRoleDto = createSearchRoleDto(query)
    const rolesPage = await fetchRoles(rolePageNumber, searchRoleDto, req)

    const permissions = await fetchPermissions(req)
    return {props: {rolesPage, permissions}}
})

const rolesPageConfig = getRolesPageConfig()
const rolesPageDictionary = getRolesPageDictionary('ru')

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
                        <Tabs.Tab
                            value={rolesPageConfig.createRoleQueryKey}
                        >
                            {rolesPageDictionary.tabs.createRole}
                        </Tabs.Tab>
                        <Tabs.Tab
                            value={rolesPageConfig.listRolesQueryKey}
                        >
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

