import {ComponentType, PropsWithChildren, ReactElement, ReactNode, useEffect, useState} from "react";
import {AppShell, Container, Divider, Navbar, NavLink, Transition} from "@mantine/core";
import {IconFiles, IconLogout, IconShieldLock, IconUsers} from "@tabler/icons-react";
import NextLink from 'next/link'
import {useRouter} from "next/router";
import {MantineProvider} from "@/share/providers";
import {signOut} from "@/features/auth";
import ErrorBoundary from "@/share/client/components/error-boundary";
import {UserInfoCard} from "@/entities/user/client";

type Route = {
    href: string
    label: string
}


const navbarRoutes: Array<Route & { icon: ReactNode }> = [
    {href: '/admin/users', label: 'Пользователи', icon: <IconUsers/>},
    {href: '/admin/roles', label: 'Роли и права', icon: <IconShieldLock/>},
    {href: '/admin/files', label: 'Файлы', icon: <IconFiles/>},
]

export function AdminLayout({children}: PropsWithChildren) {
    const router = useRouter()
    const [isLoadingPage, setIsLoadingPage] = useState(false)

    const handleLogout = async () => {
        await signOut()
        await router.push('/')
    }

    useEffect(() => {
        const handleStart = () => {
            setIsLoadingPage(true)
        }

        const handleStop = () => {
            setIsLoadingPage(false)
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <ErrorBoundary>
            <MantineProvider>
                <AppShell
                    navbar={
                        <Navbar p="md" width={{sm: 200, lg: 300}}>
                            <Navbar.Section>
                                <UserInfoCard/>
                                <Divider my="md"/>
                                {navbarRoutes.map(route => (
                                    <NavLink
                                        key={route.href}
                                        component={NextLink}
                                        href={route.href}
                                        label={route.label}
                                        icon={route.icon}
                                        active={router.pathname === route.href}
                                    />
                                ))}
                                <Divider my="md"/>
                                <NavLink
                                    label='Выйти'
                                    icon={<IconLogout/>}
                                    onClick={handleLogout}
                                />
                            </Navbar.Section>
                        </Navbar>
                    }
                >
                    <Transition transition="fade" mounted={!isLoadingPage}>
                        {(styles) => (
                            <Container style={styles} mih="100%">
                                {children}
                            </Container>
                        )}
                    </Transition>
                </AppShell>
            </MantineProvider>
        </ErrorBoundary>
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
