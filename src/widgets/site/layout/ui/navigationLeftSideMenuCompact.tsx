import {NavigationCategoryItem, NavigationLinkItem} from "@/widgets/site/layout/types";
import {isNavigationCategoryItem, isNavigationLinkItem} from "@/widgets/site/layout/lib";
import {Box, createStyles, Divider, keyframes, NavLink} from "@mantine/core";
import NextLink from "next/link";


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
        },

    }))

interface NavigationLeftSideMenuCompactProps {
    data: (NavigationCategoryItem | NavigationLinkItem)[]
}


export const NavigationLeftSideMenuCompact = ({data}: NavigationLeftSideMenuCompactProps) => {

    const categories = data.filter(isNavigationCategoryItem)
    const links = data.filter(isNavigationLinkItem)

    return (
        <Box>
            {categories.map((category) => (
                <NavLink key={category.id} label={category.label} childrenOffset="xs">
                    <NavigationLeftSideMenuCompact data={category.children}/>
                </NavLink>
            ))}
            {links.map((link) => (
                <NavLink key={link.id} component={NextLink} href={link.href} color="black" label={link.label}/>
            ))}
        </Box>
    )
}