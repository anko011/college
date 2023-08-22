import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classes from './styles.module.scss'
import {isNavigationCategoryItem, isNavigationLinkItem} from "@/widgets/site/layout/lib";
import {IconChevronRight} from "@tabler/icons-react";
import {NavigationCategoryItem, NavigationLinkItem} from "@/widgets/site/layout/types";
import cs from "classnames";

interface NavigationLeftSideMenuProps {
    data: (NavigationCategoryItem | NavigationLinkItem)[]
    isCompact?: boolean
    isInner?: boolean
}

export const LeftMenu = (
    {
        data,
        isInner = false,
        isCompact = false
    }: NavigationLeftSideMenuProps) => {
    const Root = isInner ? NavigationMenu.Sub : NavigationMenu.Root

    const categories = data.filter(isNavigationCategoryItem)
    const links = data.filter(isNavigationLinkItem)


    return (
        <Root className={cs(classes.root, isCompact && classes.compact)}>
            <NavigationMenu.List className={classes.list}>
                {categories.map((category) => (
                    <NavigationMenu.Item key={category.id} className={classes.item}>
                        <NavigationMenu.Trigger className={cs(classes.element)}>
                            <span>{category.label}</span>
                            <IconChevronRight className={classes.svg}/>
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content className={classes.content}>
                            <LeftMenu data={category.children} isInner isCompact={isCompact}/>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                ))}

                {links.map((link) => (
                    <NavigationMenu.Item key={link.id} className={classes.item}>
                        <NavigationMenu.Link className={classes.element}>{link.label}</NavigationMenu.Link>
                    </NavigationMenu.Item>
                ))}


            </NavigationMenu.List>
        </Root>
    )
}