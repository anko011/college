import {useRef, useState} from "react";
import classes from './styles.module.scss'
import {IconMenu2, IconX} from "@tabler/icons-react";
import {Logo} from "@/share/client/components";
import {LeftMenu} from "./leftMenu";
import {NavigationCategoryItem, NavigationLinkItem, NavigationType} from "@/widgets/site/layout/types";
import {Divider} from "@/share/client/components/site";
import {useScroll} from "@/share/client/hooks";

const leftMenuData: (NavigationCategoryItem | NavigationLinkItem)[] = [
    {
        id: 1,
        label: 'Сведения об образовательной организации',
        type: NavigationType.Category,
        children: [
            {
                id: 1,
                label: 'Основные сведения',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 2,
                label: 'Структура и органы управления образовательной организацией',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 3,
                label: 'Документы',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 4,
                label: 'Образование',
                type: NavigationType.Category,
                children: [
                    {
                        id: 1,
                        label: 'Образование',
                        type: NavigationType.Link,
                        href: '/'
                    },
                    {
                        id: 2,
                        label: 'Целевая моель наставничества в образовательной организации',
                        type: NavigationType.Link,
                        href: '/'
                    },
                ]
            },
            {
                id: 5,
                label: 'Образовательные стандарты',
                type: NavigationType.Link, href: '/'
            },
            {
                id: 6,
                label: 'Руководство. Педагогический (научно-педагогический) состав',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 7,
                label: 'Материально-техническое обеспечение и оснащенность образовательного процесса',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 8,
                label: 'Стипендии и меры поддержки обучающихся',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 9,
                label: 'Платные услуги',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 10,
                label: 'Финансово-хозяйственная деятельность',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 11,
                label: 'Вакантные места для приема (перевода) на 01.04.2023 г.',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 12,
                label: 'Доступная среда',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 13,
                label: 'Международное сотрудничество',
                type: NavigationType.Link,
                href: '/'
            }
        ]
    },
    {
        id: 2,
        label: 'Колледж',
        type: NavigationType.Category,
        children: [
            {
                id: 1,
                label: 'История ЗабГК',
                type: NavigationType.Link,
                href: '/'
            },
            {
                id: 2,
                label: 'Схема управления',
                type: NavigationType.Link,
                href: '/#'
            },
            {
                id: 3,
                label: 'Руководство',
                type: NavigationType.Category,
                children: [
                    {
                        id: 1,
                        label: 'Директор',
                        type: NavigationType.Link,
                        href: '/#'
                    },
                    {
                        id: 2,
                        label: 'Зам. директора по УР',
                        type: NavigationType.Link,
                        href: '/#'
                    },
                    {
                        id: 3,
                        label: 'Зам. директора по ЭР',
                        type: NavigationType.Link,
                        href: '/#'
                    },
                    {
                        id: 4,
                        label: 'Зам. директора по ВР',
                        type: NavigationType.Link,
                        href: '/#'
                    }
                ]
            },
            {
                id: 4,
                label: 'Отделения',
                type: NavigationType.Category,
                children: [
                    {
                        id: 1,
                        label: 'Геолого-маркшейдерское отделение',
                        type: NavigationType.Link,
                        href: '/'
                    },
                    {
                        id: 2,
                        label: 'Горное',
                        type: NavigationType.Link,
                        href: '/'
                    },
                    {
                        id: 3,
                        label: 'Отделение информационных технологий и экономики',
                        type: NavigationType.Link,
                        href: '/'
                    },
                    {
                        id: 4,
                        label: 'Заочное',
                        type: NavigationType.Link,
                        href: '/'
                    }
                ]
            },
        ]
    },
    {
        id: 3,
        type: NavigationType.Link,
        label: 'Противодействие коррупции',
        href: '/#'
    },
    {
        id: 4,
        type: NavigationType.Link,
        label: 'Газета "Горняцкая смена"',
        href: '/#'
    },
    {
        id: 5,
        type: NavigationType.Category,
        label: 'Газета "Горняцкая смена"',
        children: []
    },
    {
        id: 6,
        type: NavigationType.Category,
        label: 'Научно-инновационная и методическая деятельность',
        children: []
    },
    {
        id: 7,
        type: NavigationType.Category,
        label: 'ИС "ProCollege"',
        children: []
    },
    {
        id: 8,
        type: NavigationType.Category,
        label: 'Сетевой город. Образование',
        children: []
    },
    {
        id: 9,
        type: NavigationType.Category,
        label: 'Профессионалы - Заб. край',
        children: []
    },
    {
        id: 10,
        type: NavigationType.Category,
        label: 'Демонстрационный экзамен',
        children: []
    },
    {
        id: 11,
        type: NavigationType.Link,
        label: 'Охрана труда',
        href: '/'
    },
    {
        id: 12,
        type: NavigationType.Category,
        label: 'Внутрення система оценки качества образования',
        children: []
    },
    {
        id: 13,
        type: NavigationType.Link,
        label: 'Наставничество',
        href: '/'
    },
    {
        id: 14,
        type: NavigationType.Link,
        label: 'Карта сайта',
        href: '/'
    },
]

interface LeftMenuSectionProps {
    className?: string
}

export const LeftMenuSection = ({className}: LeftMenuSectionProps) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const scroll = useScroll()
    const ref = useRef<HTMLDivElement>(null)

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true)
        scroll.block()
    }

    const closeDrawer = () => {
        if (ref.current) {
            ref.current.classList.add(classes.exitMenu)
            scroll.unblock()
            setTimeout(() => {
                setIsOpenDrawer(false)
            }, 300)
        }
    }

    return (
        <nav className={className}>
            <button onClick={handleOpenDrawer} className={classes.openDrawerButton}>
                <IconMenu2/>
            </button>
            <div className={isOpenDrawer ? classes.compact : classes.root} ref={ref}>
                {isOpenDrawer && <button onClick={closeDrawer} className={classes.closeDrawerButton}><IconX/></button>}
                <Logo/>
                <Divider/>
                <LeftMenu data={leftMenuData} isCompact={isOpenDrawer}/>
            </div>
        </nav>
    )
}