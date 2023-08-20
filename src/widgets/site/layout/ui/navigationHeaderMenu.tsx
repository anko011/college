import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import {NavigationCategoryItem, NavigationLinkItem} from "@/widgets/site/layout/types";
import {isNavigationCategoryItem} from "@/widgets/site/layout/lib";
import {createStyles, Flex, keyframes, Text} from "@mantine/core";
import {IconChevronDown} from "@tabler/icons-react";

const scaleInExternal = keyframes(`
    from {
        opacity: 0;
        transform: scale(0);
    }
    
    to {
        opacity: 1;
        transform: scale(1);
    }
`)

const scaleOutExternal = keyframes(`
    from {
        opacity: 1;
        transform: scale(1);
    }
    
    to {
        opacity: 0;
        transform: scale(0);
    }
`)

const scaleInInner = keyframes(`
    from {
        opacity: 0;
        transform: scale(0) translate(100%);
    }
    
    to {
        opacity: 1;
        transform: scale(1) translate(100%);
    }
`)

const scaleOutInner = keyframes(`
    from {
        opacity: 1;
        transform: scale(1) translate(100%);
    }
    
    to {
        opacity: 0;
        transform: scale(0) translate(100%);
    }
`)

const useStyles = createStyles((theme, {isInner}: { isInner: boolean }) => ({
    svg: {
        minWidth: theme.spacing.md,
        minHeight: theme.spacing.md,
        width: theme.spacing.md,
        height: theme.spacing.md
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    externalList: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: theme.spacing.xs,
    },
    item: {
        position: 'relative'
    },
    content: {
        zIndex: 1000,
        position: 'absolute',
        '&[data-state="open"]': {
            animation: `${isInner ? scaleInInner : scaleInExternal} 200ms ease`
        },
        '&[data-state="closed"]': {
            animation: `${isInner ? scaleOutInner : scaleOutExternal} 200ms ease`
        }
    },
    innerContent: {
        transform: 'translateX(100%)',
        right: 0,
        top: 0,
    },
    element: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        padding: theme.spacing.xs,
        border: 'none',
        fontSize: theme.fontSizes.sm,
        margin: 0,
        background: theme.white,
        transition: 'color, background 200ms ease',

        '&[data-state="open"], &:hover': {
            background: theme.colors.peach[1]
        }

    },
    externalElement: {
        background: 'transparent!important',
        'svg': {
            transition: 'transform 200ms ease',
        },
        '&[data-state="open"], &:hover': {
            color: '#E46D1D',
            'svg': {
                transform: 'rotate(180deg)'
            }
        }
    }
}))

interface NavigationHeaderProps {
    navigationData: (NavigationCategoryItem | NavigationLinkItem)[]
    isInner?: boolean
}

export const NavigationHeaderMenu = (
    {
        navigationData,
        isInner = false
    }: NavigationHeaderProps) => {

    const Root = isInner ? NavigationMenu.Sub : NavigationMenu.Root
    const {classes, cx} = useStyles({isInner})

    return (
        <Root>
            <NavigationMenu.List className={cx(classes.list, !isInner && classes.externalList)}>
                {navigationData.map((item) => {

                    if (isNavigationCategoryItem(item)) return (
                        <NavigationMenu.Item key={item.id} className={classes.item}>
                            <NavigationMenu.Trigger
                                className={cx(classes.element, !isInner && classes.externalElement)}>
                                {isInner
                                    ? item.label
                                    : (<Flex align="center" justify="center" gap="xs">
                                        <Text span>{item.label}</Text>
                                        <IconChevronDown className={classes.svg}/>
                                    </Flex>)
                                }
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content className={cx(classes.content, isInner && classes.innerContent)}>
                                <NavigationHeaderMenu navigationData={item.children} isInner/>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                    )

                    return (
                        <NavigationMenu.Item key={item.id}>
                            <NavigationMenu.Link className={cx(classes.element, !isInner && classes.externalElement)}>
                                {item.label}
                            </NavigationMenu.Link>
                        </NavigationMenu.Item>
                    );
                })}
            </NavigationMenu.List>
        </Root>
    )
}