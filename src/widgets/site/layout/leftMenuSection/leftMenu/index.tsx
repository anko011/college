import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classes from './styles.module.scss'
import {IconChevronRight} from "@tabler/icons-react";
import cs from "classnames";
import {Text} from "@/share/client/components/site/text";
import {Link} from "@/share/client/components/site/link";
import {Divider} from "@/share/client/components/site";
import {Category, isCategory} from "@/entities/categories";
import {isPageLink, PageLink} from "@/entities/pages";

interface NavigationLeftSideMenuProps {
    data: (Category | PageLink)[]
    isCompact?: boolean
    isInner?: boolean
    rootPath?: string
}

export const LeftMenu = (
    {
        data,
        isInner = false,
        isCompact = false,
        rootPath = '/'
    }: NavigationLeftSideMenuProps) => {
    const Root = isInner ? NavigationMenu.Sub : NavigationMenu.Root

    const categories = data.filter(isCategory)
    const pages = data.filter(isPageLink)

    return (
        <Root className={cs(classes.root, isCompact && classes.compact)}>
            <NavigationMenu.List className={classes.list}>
                {categories.map((category) => (
                    <NavigationMenu.Item key={category.id} className={classes.item}>
                        <NavigationMenu.Trigger className={cs(classes.element, !isInner && classes.externalElement)}>
                            <Text size="sm">{category.title}</Text>
                            <IconChevronRight className={classes.svg}/>
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content className={classes.content}>
                            <LeftMenu
                                isInner
                                data={category.items}
                                isCompact={isCompact}
                                rootPath={`${rootPath}/${category.slug}`}
                            />
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                ))}
                {!isInner && <Divider className={classes.divider}/>}
                {pages.map((page) => (
                    <NavigationMenu.Item key={page.id} className={classes.item}>
                        <NavigationMenu.Link
                            className={cs(classes.element, !isInner && classes.externalElement)}
                            asChild
                        >
                            <Link href={`${rootPath}/${page.slug}`}>
                                <Text size="sm">
                                    {page.title}
                                </Text>
                            </Link>
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>
                ))}


            </NavigationMenu.List>
        </Root>
    )
}