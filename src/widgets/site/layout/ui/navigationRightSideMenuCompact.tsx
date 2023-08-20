import {NavigationLinkItem} from "@/widgets/site/layout/types";
import {createStyles, Text} from "@mantine/core";
import NextLink from "next/link";

interface NavigationRightSideMenuProps {
    menuData: (NavigationLinkItem & {
        image: {
            src: string,
            alt: string
        }
    })[]
}

const useStyles = createStyles((theme) => ({
    root: {
        boxShadow: `0 0 4px 0 rgb(0 0 0 / 25%)`,
        borderRadius: theme.radius.xl,
        padding: theme.spacing.sm,
        paddingLeft: 0,
        overflow: 'hidden'
    },
    list: {
        margin: 0,
        padding: 0,
        listStyle: 'none'
    },
    item: {
        padding: theme.spacing.xs,
    },

    link: {
        color: theme.black,
        textDecoration: "none",
        textAlign: 'center',
    }
}))

export const NavigationRightSideMenuCompact = ({menuData}: NavigationRightSideMenuProps) => {
    const {classes} = useStyles()
    return (
        <ul className={classes.list}>
            {menuData.map((link) => (
                <NextLink key={link.id} className={classes.link} href={link.href}>
                    <li className={classes.item}>
                        <Text size="sm" span>{link.label}</Text>
                    </li>
                </NextLink>
            ))}
        </ul>
    )
}