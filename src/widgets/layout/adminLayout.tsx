import {ComponentType, PropsWithChildren, ReactElement, ReactNode} from "react";
import {AppShell, Navbar, NavLink} from "@mantine/core";
import {IconBrandPagekit, IconCategory, IconLogout, IconShieldLock, IconUsers} from "@tabler/icons-react";
import NextLink from 'next/link'
import {useRouter} from "next/router";
import {MantineProvider} from "@/share/providers";

type Route = {
    href: string
    label: string
}


const navbarRoutes: Array<Route & { icon: ReactNode }> = [
    {href: '/admin/page', label: 'Страницы', icon: <IconBrandPagekit/>},
    {href: '/admin/category', label: 'Категории', icon: <IconCategory/>},
    {href: '/admin/users', label: 'Пользователи', icon: <IconUsers/>},
    {href: '/admin/permissions', label: 'Роли и права', icon: <IconShieldLock/>},
]

export function AdminLayout({children}: PropsWithChildren) {
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('/api/auth/logout/', {
            method: 'POST'
        })

        await router.push('/')
    }

    return (
        <MantineProvider>
            <AppShell
                navbar={
                    <Navbar p="md" width={{sm: 200, lg: 300}}>
                        <Navbar.Section>
                            {navbarRoutes.map(route => (
                                <NavLink
                                    key={route.href}
                                    component={NextLink}
                                    href={route.href}
                                    label={route.label}
                                    icon={route.icon}
                                    active={router.asPath === route.href}
                                />
                            ))}
                            <NavLink
                                label='Выйти'
                                icon={<IconLogout/>}
                                onClick={handleLogout}
                            />
                            <NavLink component={NextLink} href='/admin/login' label='Логин'/>

                        </Navbar.Section>
                    </Navbar>
                }
            >
                {children}
            </AppShell>
        </MantineProvider>
    )
}

export const withAdminLayout = (Page: ComponentType<any>) => {
    const PageWithLayout = Page as ComponentType & { getLayout?: (page: ReactElement) => ReactNode }
    PageWithLayout.getLayout = (page) => (
        <AdminLayout>
            {page}
        </AdminLayout>
    )

    return PageWithLayout
}
