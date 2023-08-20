import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import {NavigationCategoryItem, NavigationLinkItem} from "@/widgets/site/layout/types";
import {isNavigationCategoryItem, isNavigationLinkItem} from "@/widgets/site/layout/lib";
import {createStyles, Divider, keyframes, Text} from "@mantine/core";
import {IconChevronRight} from "@tabler/icons-react";


const scaleIn = keyframes(`
    0%{
        transform: scale(0) translateX(100%);
        opacity: 0;
    }
    100%{
        transform: scale(1) translateX(100%);
        opacity: 1;
    }
`)

const scaleIOut = keyframes(`
    100%{
        transform: scale(0) translateX(100%);
        opacity: 0;
    }
  
    0%{
        transform: scale(1) translateX(100%);
        opacity: 1;
    }
`)


const useStyles = createStyles((theme) =>
    ({
        svg: {
            minWidth: theme.spacing.md,
            minHeight: theme.spacing.md,
            width: theme.spacing.md,
            height: theme.spacing.md,
        },
        content: {
            background: theme.white,
            position: "absolute",
            top: 0,
            right: 0,
            transform: `translateX(100%)`,
            zIndex: 100,
            '&[data-state="open"]': {
                animation: `${scaleIn} 200ms ease`
            },
            '&[data-state="closed"]': {
                animation: `${scaleIOut} 200ms ease`
            }
        },
        item: {
            position: "relative",
        },
        list: {
            listStyle: 'none',
            padding: 0,

        },
        element: {
            border: 'none',
            width: '100%',
            fontSize: theme.fontSizes.xs,
            display: 'flex',
            justifyContent: 'space-between',
            gap: theme.spacing.xs,
            textAlign: 'left',
            alignItems: 'center',
            background: "transparent",
            cursor: 'pointer',
            padding: theme.spacing.xs,
            transition: 'background 200ms ease',
            '&:hover, &[data-state="open"]': {
                background: theme.colors.peach[1]
            },
        },
        externalTrigger: {
            '&': {
                borderBottomLeftRadius: theme.radius.md,
                borderTopLeftRadius: theme.radius.md,
            },
            '&:hover, &[data-state="open"]': {
                boxShadow: `inset 0 0 1px 1px ${theme.fn.themeColor('peach.0')}`,
            },
        }
    }))

interface NavigationLeftSideMenuProps {
    data: (NavigationCategoryItem | NavigationLinkItem)[]
    isInner?: boolean
}

export const NavigationLeftSideMenu = (
    {
        data,
        isInner,
    }: NavigationLeftSideMenuProps) => {
    const Root = isInner ? NavigationMenu.Sub : NavigationMenu.Root

    const categories = data.filter(isNavigationCategoryItem)
    const links = data.filter(isNavigationLinkItem)

    const {classes, cx} = useStyles()

    return (
        <Root>
            <NavigationMenu.List className={classes.list}>
                {categories.map((category) => (
                    <NavigationMenu.Item key={category.id} className={classes.item}>
                        <NavigationMenu.Trigger className={cx(classes.element, !isInner && classes.externalTrigger)}>
                            <Text>{category.label}</Text>
                            <IconChevronRight className={classes.svg}/>
                        </NavigationMenu.Trigger>

                        <NavigationMenu.Content className={classes.content}>
                            <NavigationLeftSideMenu data={category.children} isInner/>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                ))}
                {!isInner && <Divider w="100%" color="black" my="xs"/>}
                {links.map((link) => (
                    <NavigationMenu.Item key={link.id} className={classes.item}>
                        <NavigationMenu.Link className={classes.element}>{link.label}</NavigationMenu.Link>
                    </NavigationMenu.Item>
                ))}
            </NavigationMenu.List>
        </Root>
    )
}