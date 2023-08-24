import {Bitter, Inter} from "next/font/google";
import {ComponentType, PropsWithChildren, ReactElement, ReactNode} from "react";
import cs from 'classnames'
import {NavigationLinkItem, NavigationType} from "@/widgets/site/layout/types";
import ErrorBoundary from "@/share/client/components/error-boundary";
import classes from './styles.module.scss'
import {RightMenu} from "@/widgets/site/layout/rightMenu";
import {InteractSection} from "@/widgets/site/layout/interactSection";
import {Footer} from "@/widgets/site/layout/footer";
import {SubFooter} from "@/widgets/site/layout/subFooter";
import colors from './colors.module.scss'
import {LeftMenuSection} from "@/widgets/site/layout/leftMenuSection";
import {Header} from "@/widgets/site/layout/header";


const inter = Inter({subsets: ['cyrillic']})
const bitter = Bitter({subsets: ['cyrillic']})


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
                src: '/rightMenu/document.jpg',
                alt: 'Фоновое изображение пункта меню'
            }
        },
        {
            id: 2,
            label: 'Расписание',
            type: NavigationType.Link,
            href: '/',
            image: {
                src: '/rightMenu/schedule.jpg',
                alt: 'Фоновое изображение пункта меню'
            }
        },
        {
            id: 3,
            label: 'Контакты',
            type: NavigationType.Link,
            href: '/',
            image: {
                src: '/rightMenu/contacts.jpg',
                alt: 'Фоновое изображение пункта меню'
            }
        },
        {
            id: 4,
            label: 'Корпаративная форма',
            href: '/',
            type: NavigationType.Link,
            image: {
                src: '/rightMenu/clothes.jpg',
                alt: 'Фоновое изображение пункта меню'
            }
        },
        {
            id: 5,
            label: 'Группа VK',
            type: NavigationType.Link,
            href: '/',
            image: {
                src: '/rightMenu/vk.jpg',
                alt: 'Фоновое изображение пункта меню'
            }
        }
    ]


export function SiteLayout({children}: PropsWithChildren) {

    return (
        <div className={cs(classes.root, colors.root)}>
            <LeftMenuSection className={classes.leftNavigation}/>
            <Header className={classes.header}/>

            <div className={cs(classes.content, classes.contentSection)}>
                <main className={classes.pageContent}>
                    {children}
                </main>

                <div className={classes.rightSection}>
                    <InteractSection/>
                    <RightMenu menuData={rightMenuData}/>
                </div>
            </div>

            <Footer className={classes.footer}/>

            <div className={classes.additional}>
                <SubFooter/>
            </div>
        </div>
    )
}


export const withSiteLayout = (Page: ComponentType<any>) => {
    const PageWithLayout = Page as ComponentType & { getLayout?: (page: ReactElement) => ReactNode }
    PageWithLayout.getLayout = (page) => (
        <ErrorBoundary>
            <SiteLayout>
                {page}
            </SiteLayout>
        </ErrorBoundary>
    )

    return PageWithLayout
}
