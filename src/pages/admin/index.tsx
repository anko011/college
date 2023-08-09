import {withAdminLayout} from "@/widgets/layout/adminLayout";
import {LinkCard} from "@/share/client/components/admin";
import {Divider, Grid, Stack, Title} from "@mantine/core";


function AdminHomePage() {
    return (
        <>
            <Title order={4}>Быстрые ссылки</Title>
            <Divider my="md"/>
            <Grid bg="gray.0">
                <Grid.Col span={3}>
                    <Stack p="md">
                        <Title order={5} align="center">Пользователи</Title>
                        <LinkCard href={`/admin/users?activeTab=}`} title="Список пользователей"/>
                        <LinkCard href="/admin" title="Создать пользователя"/>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Stack p="md">
                        <Title order={5} align="center">Роли</Title>
                        <LinkCard href="/admin" title="Список ролей"/>
                        <LinkCard href="/admin" title="Создать роль"/>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Stack p="md">
                        <Title order={5} align="center">Страницы</Title>
                        <LinkCard href="/admin" title="Список страниц"/>
                        <LinkCard href="/admin" title="Создать страницу"/>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Stack p="md">
                        <Title order={5} align="center">Медиа</Title>
                        <LinkCard href="/admin" title="Ссылка"/>
                        <LinkCard href="/admin" title="Ссылка"/>
                    </Stack>
                </Grid.Col>
            </Grid>
        </>
    )
}


export default withAdminLayout(AdminHomePage)

