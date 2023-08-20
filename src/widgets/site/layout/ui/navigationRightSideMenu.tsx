import {NavigationLinkItem} from "@/widgets/site/layout/types";
import {createStyles, Text} from "@mantine/core";
import Image from "next/image";
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
        borderBottomRightRadius: theme.spacing.sm,
        borderTopRightRadius: theme.spacing.sm,
        minHeight: '92px',
        padding: theme.spacing.lg,
        paddingLeft: 0,
        cursor: 'pointer',

        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',

        position: "relative",
        overflow: 'hidden',

        transition: 'color 300ms ease',

        '&:hover': {
            color: theme.white,
            'img': {
                opacity: 1,
            }
        }
    },
    image: {
        transition: 'opacity 300ms ease',
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    link: {
        color: theme.black,
        textDecoration: "none"
    }
}))

export const NavigationRightSideMenu = ({menuData}: NavigationRightSideMenuProps) => {
    const {classes} = useStyles()
    return (
        <ul className={classes.list}>
            {menuData.map((link) => (
                <NextLink key={link.id} className={classes.link} href={link.href}>
                    <li className={classes.item}>
                        <Image
                            className={classes.image}
                            src={link.image.src}
                            alt={link.image.alt}
                            width="1920"
                            height="1080"
                        />
                        <Text ml="xs" size="sm" span sx={{zIndex: 1}}>{link.label}</Text>
                    </li>
                </NextLink>
            ))}
        </ul>
    )
}