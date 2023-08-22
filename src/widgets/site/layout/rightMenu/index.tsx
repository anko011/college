import NextLink from "next/link";
import {NavigationLinkItem} from "@/widgets/site/layout/types";
import classes from './styles.module.scss'
import {Box} from "@/share/client/components/site";

interface RightMenuProps {
    menuData: (NavigationLinkItem & {
        image: {
            src: string,
            alt: string
        }
    })[]
}

export const RightMenu = ({menuData}: RightMenuProps) => {
    return (
        <Box className={classes.root}>
            <ul className={classes.list}>
                {menuData.map((link) => (
                    <NextLink
                        key={link.id}
                        className={classes.link}
                        href={link.href}
                    >
                        <li className={classes.item}>
                            {/*<Image*/}
                            {/*    className={classes.image}*/}
                            {/*    src={link.image.src}*/}
                            {/*    alt={link.image.alt}*/}
                            {/*    width="1920"*/}
                            {/*    height="1080"*/}
                            {/*/>*/}
                            <span>{link.label}</span>
                        </li>
                    </NextLink>
                ))}
            </ul>
        </Box>
    )
}