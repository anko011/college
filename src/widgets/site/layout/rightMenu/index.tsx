import NextImage from "next/image"
import classes from './styles.module.scss'
import {Box} from "@/share/client/components/site";
import {Text} from "@/share/client/components/site/text";
import {Link} from "@/share/client/components/site/link";
import {PageLinkWithImage} from "@/entities/pages";

interface RightMenuProps {
    menuData: PageLinkWithImage[]
}

export const RightMenu = ({menuData}: RightMenuProps) => {
    return (
        <Box className={classes.root}>
            <ul className={classes.list}>
                {menuData.map((link) => (
                    <Link
                        key={link.id}
                        className={classes.link}
                        href={link.slug}
                    >
                        <li>
                            <NextImage
                                className={classes.image}
                                src={link.imageSrc}
                                alt={link.imageAlt}
                                width="256"
                                height="128"
                            />
                            <Text size="sm">{link.title}</Text>
                        </li>
                    </Link>
                ))}
            </ul>
        </Box>
    )
}