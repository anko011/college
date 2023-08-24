import {useRef, useState} from "react";
import classes from './styles.module.scss'
import {IconMenu2} from "@tabler/icons-react";
import {Logo} from "@/share/client/components";
import {LeftMenu} from "./leftMenu";
import {NavigationCategoryItem, NavigationLinkItem, NavigationType} from "@/widgets/site/layout/types";
import {Divider} from "@/share/client/components/site";

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

interface LeftMenuSectionProps {
    className?: string
}

export const LeftMenuSection = ({className}: LeftMenuSectionProps) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const handleToggleDrawer = () => {
        if (ref.current) ref.current.classList.add(classes.exitMenu)
        setTimeout(() => {
            if (ref.current) ref.current.classList.remove(classes.exitMenu)
            setIsOpenDrawer((prev) => !prev)
        }, 300)
    }

    return (
        <nav className={className}>
            <button onClick={handleToggleDrawer} className={classes.burger}>
                <IconMenu2/>
            </button>
            <div className={isOpenDrawer ? classes.compact : classes.root} ref={ref}>
                {isOpenDrawer && <button onClick={handleToggleDrawer} className={classes.closeDrawer}>X</button>}
                <Logo/>
                <Divider/>
                <LeftMenu data={leftMenuData} isCompact={isOpenDrawer}/>
            </div>
        </nav>
    )
}