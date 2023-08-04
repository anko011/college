import {Tabs} from "@mantine/core";
import {withAdminLayout} from "@/widgets/layout";
import {useAppRouter} from "@/share/client/hooks/useAppRouter";

const AdminRolesPage = () => {
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
                    Форма создания роли
                </Tabs.Panel>
                <Tabs.Panel value="roleList">
                    список всех ролей
                </Tabs.Panel>
            </Tabs>

        </>
    )
}

export default withAdminLayout(AdminRolesPage)

