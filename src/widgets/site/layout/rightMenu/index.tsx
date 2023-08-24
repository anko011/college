import NextImage from "next/image"
import {NavigationLinkItem} from "@/widgets/site/layout/types";
import classes from './styles.module.scss'
import {Box} from "@/share/client/components/site";
import {Text} from "@/share/client/components/site/text";
import {Link} from "@/share/client/components/site/link";

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
                    <Link
                        key={link.id}
                        className={classes.link}
                        href={link.href}
                    >
                        <li>
                            <NextImage
                                className={classes.image}
                                src={link.image.src}
                                alt={link.image.alt}
                                width="256"
                                height="128"
                            />
                            <Text>{link.label}</Text>
                        </li>
                    </Link>
                ))}
            </ul>
        </Box>
    )
}