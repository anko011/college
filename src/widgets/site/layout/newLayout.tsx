import {Bitter, Inter} from "next/font/google";
import {ComponentType, PropsWithChildren, ReactElement, ReactNode, useRef, useState} from "react";
import cs from 'classnames'
import {NavigationCategoryItem, NavigationLinkItem, NavigationType} from "@/widgets/site/layout/types";
import ErrorBoundary from "@/share/client/components/error-boundary";
import classes from './styles.module.scss'
import {LeftMenu} from "@/widgets/site/layout/leftMenu";
import {Logo} from "@/share/client/components";
import {IconMenu2} from "@tabler/icons-react";
import Image from "next/image";
import {HeaderMenu} from "@/widgets/site/layout/headerMenu";
import {RightMenu} from "@/widgets/site/layout/rightMenu";


const inter = Inter({subsets: ['cyrillic']})
const bitter = Bitter({subsets: ['cyrillic']})

const leftMenuData: (NavigationCategoryItem | NavigationLinkItem)[] = [
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
                type: NavigationType.Category,
                children: [
                    {
                        id: 1,
                        label: 'Устав',
                        href: '/',
                        type: NavigationType.Link,
                    },
                    {
                        id: 2,
                        label: 'Список уполномоченных лиц',
                        href: '/',
                        type: NavigationType.Link,
                    }
                ]
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


const LeftMenuSection = () => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const handleToggleDrawer = () => {
        if (ref.current) ref.current.classList.add(classes.exitMenuSection)
        setTimeout(() => {
            if (ref.current) ref.current.classList.remove(classes.exitMenuSection)
            setIsOpenDrawer((prev) => !prev)
        }, 300)
    }

    return (
        <>
            <button onClick={handleToggleDrawer} className={classes.burger}>
                <IconMenu2/>
            </button>
            <div className={isOpenDrawer ? classes.leftMenuSectionCompact : classes.leftMenuSection} ref={ref}>
                {isOpenDrawer && <button onClick={handleToggleDrawer} className={classes.closeDrawer}>X</button>}
                <Logo/>
                <div className={classes.divider}/>
                <LeftMenu data={leftMenuData} isCompact={isOpenDrawer}/>
            </div>
        </>
    )
}
const HeaderSection = () => {
    return (
        <div className={classes.headerSection}>
            <span className={classes.headerTitle}>Забайкальский горный колледж им. М.И. Агошкова</span>
            <Image className={classes.headerImage} src="/agoshkov.png" alt="asdf" width={100} height={123}/>
            <div className={classes.headerMenu}>
                <HeaderMenu navigationData={headerMenuData}/>
            </div>
        </div>
    )
}

export function NewSiteLayout({children}: PropsWithChildren) {

    return (
        <>
            <div className={cs(classes.root)}>
                <nav className={classes.leftNavigation}>
                    <LeftMenuSection/>
                </nav>
                <header className={classes.header}>
                    <HeaderSection/>
                </header>
                <div className={cs(classes.content, classes.contentSection)}>
                    <div className={classes.pageContent}>
                        {children}
                    </div>

                    <div className={classes.rightNavigation}>
                        <RightMenu menuData={rightMenuData}/>
                    </div>
                </div>
                <footer className={classes.footer}>Footer</footer>
                <div className={classes.additional}>Additional</div>
            </div>
        </>
    )
}


export const withNewSiteLayout = (Page: ComponentType<any>) => {
    const PageWithLayout = Page as ComponentType & { getLayout?: (page: ReactElement) => ReactNode }
    PageWithLayout.getLayout = (page) => (
        <ErrorBoundary>
            <NewSiteLayout>
                {page}
            </NewSiteLayout>
        </ErrorBoundary>
    )

    return PageWithLayout
}
