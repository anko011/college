import {ComponentType, PropsWithChildren, ReactElement, ReactNode} from "react";
import ErrorBoundary from "@/share/client/components/error-boundary";
import {
    Anchor,
    Box,
    Burger,
    createStyles,
    Divider,
    Drawer,
    Flex,
    Grid,
    MantineProvider,
    Stack,
    Text,
    Title
} from "@mantine/core";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import {Bitter, Inter} from "next/font/google";
import {
    InteractiveSection,
    NavigationHeaderMenu,
    NavigationLeftSideMenu,
    NavigationLeftSideMenuCompact,
    NavigationRightSideMenuCompact,
} from "@/widgets/site/layout/ui";
import {NavigationCategoryItem, NavigationLinkItem, NavigationType} from "@/widgets/site/layout/types";
import {NavigationRightSideMenu} from "@/widgets/site/layout/ui/navigationRightSideMenu";
import {Logo} from "@/share/client/components";
import Image from "next/image";
import {IconMap2, IconMessages, IconPhoneIncoming} from "@tabler/icons-react";
import NextLink from "next/link";


const inter = Inter({subsets: ['cyrillic']})
const bitter = Bitter({subsets: ['cyrillic']})

const menuData: (NavigationCategoryItem | NavigationLinkItem)[] = [
    {
        id: 1,
        label: 'Сведения об образовательной организации',
        type: NavigationType.Category,
        children: [
            {
                id: 1,
                label: 'Общие документы',
                type: NavigationType.Category,
                children: [
                    {
                        id: 1,
                        label: 'Устав',
                        type: NavigationType.Link,
                        href: '/#'
                    },
                    {
                        id: 2,
                        label: 'Права',
                        type: NavigationType.Link,
                        href: '/#'
                    },
                    {
                        id: 3,
                        label: 'Категория такая то',
                        type: NavigationType.Category,
                        children: [
                            {
                                id: 1,
                                label: 'Устав',
                                type: NavigationType.Link,
                                href: '/#'
                            },
                            {
                                id: 2,
                                label: 'Права',
                                type: NavigationType.Link,
                                href: '/#'
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                label: 'Частные документы',
                type: NavigationType.Category,
                children: [
                    {
                        id: 1,
                        label: 'Устав',
                        type: NavigationType.Link,
                        href: '/#'
                    },
                    {
                        id: 2,
                        label: 'Права',
                        type: NavigationType.Link,
                        href: '/#'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        label: 'Сведения об образовательной организации',
        type: NavigationType.Category,
        children: [
            {
                id: 1,
                label: 'Общие документы',
                type: NavigationType.Category,
                children: [
                    {
                        id: 1,
                        label: 'Устав',
                        type: NavigationType.Link,
                        href: '/#'
                    },
                    {
                        id: 2,
                        label: 'Права',
                        type: NavigationType.Link,
                        href: '/#'
                    }
                ]
            },
            {
                id: 2,
                label: 'Частные документы',
                type: NavigationType.Link,
                href: '/#'
            }
        ]
    },
    {
        id: 3,
        type: NavigationType.Link,
        label: 'Ссылочка',
        href: '/#'
    }
]
const headerMenuData: (NavigationCategoryItem | NavigationLinkItem)[] = [
    {
        id: 1,
        label: 'Главная',
        type: NavigationType.Link,
        href: '/'
    },
    {
        id: 2,
        label: 'Аббитуриенту',
        type: NavigationType.Category,
        children: [
            {
                id: 1,
                label: 'Специальности',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 2,
                label: 'Нормативные документы',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 3,
                label: 'Поступления 2022',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 4,
                label: 'Профориентация',
                type: NavigationType.Link,
                href: '/'
            }
        ]
    },
    {
        id: 3,
        label: 'Студенту',
        type: NavigationType.Category,
        children: [
            {
                id: 1,
                label: 'Студенту очного отделения',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 2,
                label: 'Студенту заочного отделения',
                type: NavigationType.Link,
                href: '/'
            },
        ]
    },
    {
        id: 4,
        label: 'Выпускнику',
        type: NavigationType.Link,
        href: '/'
    },
    {
        id: 5,
        label: 'Часто задаваемые вопросы',
        type: NavigationType.Link,
        href: '/'
    }
]
const rightMenuData: (NavigationLinkItem & {
    image: {
        src: string,
        alt: string,
    }
})[] =
    [
        {
            id: 1,
            label: 'Заявка справки об обучении',
            type: NavigationType.Link,
            href: '/',
            image: {
                src: '/agoshkov.png',
                alt: 'Фоновое изображение пункта меню'
            }
        },
        {
            id: 2,
            label: 'Расписание',
            type: NavigationType.Link,
            href: '/',
            image: {
                src: '/agoshkov.png',
                alt: 'Фоновое изображение пункта меню'
            }
        },
        {
            id: 3,
            label: 'Контакты',
            type: NavigationType.Link,
            href: '/',
            image: {
                src: '/agoshkov.png',
                alt: 'Фоновое изображение пункта меню'
            }
        },
        {
            id: 4,
            label: 'Корпаративная форма',
            href: '/',
            type: NavigationType.Link,
            image: {
                src: '/agoshkov.png',
                alt: 'Фоновое изображение пункта меню'
            }
        },
        {
            id: 5,
            label: 'Группа VK',
            type: NavigationType.Link,
            href: '/',
            image: {
                src: '/agoshkov.png',
                alt: 'Фоновое изображение пункта меню'
            }
        }
    ]

const useStyles = createStyles((theme) => ({
    root: {
        background: 'conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0.00), #F7ECD0 316deg, rgba(255, 255, 255, 0.00) 360deg)',
        margin: 0,
    },
    baseBox: {
        boxShadow: `0 0 4px 0 rgb(0 0 0 / 25%)`,
        padding: theme.spacing.sm,
        borderRadius: theme.radius.xl,
    },
    orangeBox: {
        background: 'rgba(255, 233, 177, 0.5)',
    },
    grayBox: {
        boxShadow: theme.colors.gray[1],
    },
    leftMenu: {
        borderRadius: 0,
        borderTopRightRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
    },
    rightMenu: {
        overflow: 'hidden',
        paddingLeft: 0,
    },
    contentSection: {
        boxShadow: `inset 0 4px 4px 0 rgb(0 0 0 / 25%)`,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg,
        background: theme.colors.gray[1]
    },
    footer: {
        padding: '40px 80px',
        'object': {
            color: theme.colors.gray[1]
        },

        'svg': {
            minWidth: '16px',
            minHeight: '16px'
        }
    }

}))

const FooterLink = ({label, href}: { label: string, href: string }) => (
    <Anchor
        component={NextLink}
        href={href}
        color="black"
        fz="xs"
        fw={600}
    >
        {label}
    </Anchor>
)

const ImageLink = ({src}: { src: string }) => <Anchor component={NextLink} href="/" sx={{
    display: 'block',
    minWidth: '228px',
    minHeight: '64px',
    background: `no-repeat url("${src}")`,

    '&:hover': {
        backgroundPositionY: "100%"
    }
}}/>

export function SiteLayout({children}: PropsWithChildren) {
    const isSmallLaptop = useMediaQuery('(max-width: 64em)')
    const isTable = useMediaQuery('(max-width: 48em)');
    const isBigPhone = useMediaQuery('(max-width: 29.57em)');

    const [isOpenDrawer, {open: openDrawer, close: closeDrawer}] = useDisclosure(false)
    const {classes, cx} = useStyles()
    return (
        <Grid className={classes.root}>
            {
                isSmallLaptop
                    ? (
                        <Grid.Col span={12}>
                            <Burger opened={isOpenDrawer} onClick={openDrawer}/>
                            <Drawer opened={isOpenDrawer} onClose={closeDrawer}>
                                <Stack align="center" spacing="xs">
                                    <Logo/>
                                    <Divider w="100%" color="black"/>
                                    <NavigationLeftSideMenuCompact data={menuData}/>
                                </Stack>
                            </Drawer>
                        </Grid.Col>
                    )
                    : (
                        <Grid.Col span="content" w="230px" pl={0}>
                            <Stack className={cx(classes.baseBox, classes.orangeBox, classes.leftMenu)}>
                                <Stack align="center" spacing="xs">
                                    <Logo/>
                                    <Divider w="100%" mb="-xs" color="black"/>
                                    <NavigationLeftSideMenu data={menuData}/>
                                </Stack>
                            </Stack>
                        </Grid.Col>
                    )
            }

            <Grid.Col span="auto">
                <Grid>
                    <Grid.Col span={12} p={0}>
                        <Flex p="xs">
                            <Flex direction="column" align="center" w="100%">
                                <Text fz={32} align="center" className={cx(bitter.className)}>
                                    Забайкальский горный колледж им. М.И.Агошкова
                                </Text>
                                <NavigationHeaderMenu navigationData={headerMenuData}/>
                            </Flex>
                            {!isBigPhone &&
                                <Image src="/agoshkov.png" alt="Портрет М.И. Агошкова" width={100} height={123}/>}
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Box className={classes.contentSection}>
                            <Grid m={0}>
                                <Grid.Col
                                    span={isBigPhone ? 12 : isTable ? 12 : 9}
                                    order={isBigPhone ? 1 : isTable ? 1 : 0}
                                >
                                    {children}
                                </Grid.Col>

                                <Grid.Col
                                    span={isBigPhone ? 12 : isTable ? 12 : 3}
                                    order={isBigPhone ? 0 : isTable ? 0 : 1}
                                >
                                    <Stack>
                                        <Box component={Stack} p="lg" className={cx(classes.baseBox, classes.grayBox)}>
                                            <InteractiveSection/>
                                        </Box>

                                        <Box
                                            component="nav"
                                            className={cx(classes.baseBox, classes.grayBox, classes.rightMenu)}
                                        >
                                            {isTable
                                                ? <NavigationRightSideMenuCompact menuData={rightMenuData}/>
                                                : <NavigationRightSideMenu menuData={rightMenuData}/>
                                            }

                                        </Box>
                                    </Stack>
                                </Grid.Col>
                            </Grid>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Grid.Col>

            <Grid.Col span={12} className={cx(classes.orangeBox, classes.footer)}>
                <Grid>
                    <Grid.Col span="auto">
                        <Flex justify="center">
                            <Logo/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={isTable ? 12 : isSmallLaptop ? 'auto' : 'content'}>
                        <Stack align={isTable ? 'center' : 'start'} justify="center" w="100%">
                            <Title
                                order={6}
                                align={isTable ? 'center' : "start"}
                            >
                                Забайкальский горный коллежд им.
                                М.И. Агошкова
                            </Title>

                            <Flex align="center" gap="xs">
                                <IconPhoneIncoming/>
                                <Text fz="xs" span>+7 (3022) 99-99-99</Text>
                            </Flex>

                            <Flex align="center" gap="xs">
                                <IconMessages/>
                                <Text fz="xs" span>college@mail.ru</Text>
                            </Flex>

                            <Flex align="center" gap="xs">
                                <IconMap2/>
                                <Text fz="xs" span>
                                    672000, Забайкальский край, г. Чита, ул.
                                    Баргузинская, д. 41
                                </Text>
                            </Flex>

                        </Stack>
                    </Grid.Col>

                    <Grid.Col span="auto">
                        <Stack>
                            <FooterLink label="Аббитуриенту" href="/"/>
                            <FooterLink label="Колледж" href="/"/>
                            <FooterLink label="Образование" href="/"/>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span="auto">
                        <Stack>
                            <FooterLink label="Наука" href="/"/>
                            <FooterLink label="Сотрудничество" href="/"/>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span="auto">
                        <Stack>
                            <FooterLink label="Новости" href="/"/>
                            <FooterLink label="Контакты" href="/"/>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span="auto">
                        <Stack>
                            <FooterLink label="Госуслуги" href="/"/>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Grid.Col>


            <Grid.Col span={12} bg="gray.1">
                <Flex sx={{padding: '0 40px'}} align="center" justify="center" gap="md" wrap="wrap">
                    <ImageLink src="/minobr.png"/>
                    <ImageLink src="/minobrnauki.png"/>
                    <ImageLink src="/rosobrnadzor.png"/>
                    <ImageLink src="/minpros.png"/>
                    <ImageLink src="/gosuslugi.png"/>
                </Flex>
            </Grid.Col>
        </Grid>
    )
}


export const withSiteLayout = (Page: ComponentType<any>) => {
    const PageWithLayout = Page as ComponentType & { getLayout?: (page: ReactElement) => ReactNode }
    PageWithLayout.getLayout = (page) => (
        <ErrorBoundary>
            <MantineProvider
                theme={{
                    fontFamily: inter.style.fontFamily,
                    colors: {
                        peach: ['#ffffff', '#ffe9b3', '#fedb83', '#fecd52', '#febe27', '#e5a515', '#b2800c', '#805c05', '#4d3700', '#1c1200']
                    },
                    components: {
                        Text: {
                            classNames: {
                                root: inter.className
                            }
                        },
                        Title: {
                            classNames: {
                                root: bitter.className
                            }
                        }
                    },
                }}
                withGlobalStyles
                withNormalizeCSS
            >
                <SiteLayout>
                    {page}
                </SiteLayout>
            </MantineProvider>
        </ErrorBoundary>
    )

    return PageWithLayout
}
