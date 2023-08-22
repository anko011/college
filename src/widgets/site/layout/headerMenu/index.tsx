import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {isNavigationCategoryItem} from "@/widgets/site/layout/lib";
import {IconChevronDown} from "@tabler/icons-react";
import {NavigationCategoryItem, NavigationLinkItem} from "@/widgets/site/layout/types";
import classes from './styles.module.scss'
import cs from 'classnames'

interface HeaderMenuProps {
    navigationData: (NavigationCategoryItem | NavigationLinkItem)[]
    isInner?: boolean
}

export const HeaderMenu = (
    {
        navigationData,
        isInner = false
    }: HeaderMenuProps) => {
    const Root = isInner ? NavigationMenu.Sub : NavigationMenu.Root

    return (
        <Root className={classes.root}>
            <NavigationMenu.List className={cs(classes.list, !isInner && classes.externalList)}>
                {navigationData.map((item) => {

                    if (isNavigationCategoryItem(item)) return (
                        <NavigationMenu.Item key={item.id} className={classes.item}>
                            <NavigationMenu.Trigger
                                className={cs(classes.element, !isInner && classes.externalElement)}>
                                {item.label}
                                <IconChevronDown/>
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content
                                className={cs(classes.content, isInner && classes.innerContent, isInner ? classes.contentInnerAnimation : classes.contentExternalAnimation)}>
                                <HeaderMenu navigationData={item.children} isInner/>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                    )

                    return (
                        <NavigationMenu.Item key={item.id} className={classes.item}>
                            <NavigationMenu.Link className={cs(classes.element, !isInner && classes.externalElement)}>
                                {item.label}
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    );
                })}
            </NavigationMenu.List>
        </Root>
    )
}