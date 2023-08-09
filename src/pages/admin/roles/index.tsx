import {Tabs} from "@mantine/core";
import {withAdminLayout} from "@/widgets/layout";
import {useAppRouter} from "@/share/client/hooks/useAppRouter";
import {RoleCreateForm} from "@/features/role";
import {withHandleError} from "@/share/lib/apiService";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {RoleListWidget} from "@/widgets/role";
import {fetchRoles} from "@/entities/role";
import {fetchPermissions} from "@/entities/permission";

export const getServerSideProps = withHandleError(async ({req}: GetServerSidePropsContext) => {
    const roles = await fetchRoles(0, req)
    const permissions = await fetchPermissions(req)
    return {props: {roles, permissions}}
})

const AdminRolesPage = ({roles, permissions}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useAppRouter()
    const handleTabChange = (value: string) => router.updateQuery('activeTab', value)

    return (
        <>
            <Tabs value={router.query.activeTab as string ?? 'createRole'} onTabChange={handleTabChange}>
                <Tabs.List grow mb="md">
                    <Tabs.Tab value="createRole">Создание роли</Tabs.Tab>
                    <Tabs.Tab value="roleList">Список ролей</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="createRole">
                    <RoleCreateForm permissions={permissions}/>
                </Tabs.Panel>
                <Tabs.Panel value="roleList">
                    <RoleListWidget totalCountPages={0} roles={roles} permissions={permissions}/>
                </Tabs.Panel>
            </Tabs>

        </>
    )
}

export default withAdminLayout(AdminRolesPage)

