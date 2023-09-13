import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {IconChevronDown} from "@tabler/icons-react";
import classes from './styles.module.scss'
import cs from 'classnames'
import {Link} from "@/share/client/components/site/link";
import {Text} from "@/share/client/components/site/text";
import {Category, isCategory} from "@/entities/categories";
import {PageLink} from "@/entities/pages";

interface HeaderMenuProps {
    navigationData: (Category | PageLink)[]
    isInner?: boolean
    path?: string
}

export const HeaderMenu = (
    {
        navigationData,
        isInner = false,
        path = '/'
    }: HeaderMenuProps) => {
    const Root = isInner ? NavigationMenu.Sub : NavigationMenu.Root

    return (
        <Root className={classes.root}>
            <NavigationMenu.List className={cs(classes.list, !isInner && classes.externalList)}>
                {navigationData.map((item) => {

                    if (isCategory(item)) return (
                        <NavigationMenu.Item key={item.id} className={classes.item}>
                            <NavigationMenu.Trigger
                                className={cs(classes.element, !isInner && classes.externalElement)}
                            >
                                <Text size="sm">
                                    {item.title}
                                </Text>
                                <IconChevronDown className={classes.svg}/>
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content
                                className={cs(classes.content, isInner && classes.innerContent, isInner ? classes.contentInnerAnimation : classes.contentExternalAnimation)}>
                                <HeaderMenu navigationData={item.items} isInner path={`${path}/${item.slug}`}/>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                    )

                    return (
                        <NavigationMenu.Item key={item.id} className={classes.item}>
                            <NavigationMenu.Link className={cs(classes.element, !isInner && classes.externalElement)}
                                                 asChild>
                                <Link href={`${path}/${item.slug}`}>
                                    <Text size="sm">
                                        {item.title}
                                    </Text>
                                </Link>
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    );
                })}
            </NavigationMenu.List>
        </Root>
    )
}