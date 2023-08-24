import classes from "./styles.module.scss";
import Image from "next/image";
import {HeaderMenu} from "./headerMenu";
import {NavigationCategoryItem, NavigationLinkItem, NavigationType} from "@/widgets/site/layout/types";
import cs from "classnames";
import {Title} from "@/share/client/components/site/title";

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

interface HeaderProps {
    className?: string
}

export const Header = ({className}: HeaderProps) => {
    return (
        <header className={cs(classes.root, className)}>
            <Title className={classes.title}>Забайкальский горный колледж им. М.И. Агошкова</Title>
            <Image className={classes.image} src="/agoshkov.png" alt="asdf" width={100} height={123}/>
            <div className={classes.menu}>
                <HeaderMenu navigationData={headerMenuData}/>
            </div>
        </header>
    )
}
