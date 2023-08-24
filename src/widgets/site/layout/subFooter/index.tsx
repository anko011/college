import NextImage, {StaticImageData} from "next/image";
import NextLink from "next/link";
import classes from './styles.module.scss'
import minobr from '../../../../../public/minobr.png'
import rosobrnadzor from '../../../../../public/rosobrnadzor.png'
import minobrnauki from '../../../../../public/minobrnauki.png'
import minpros from '../../../../../public/minpros.png'
import gosuslugi from '../../../../../public/gosuslugi.png'

const Item = ({src, href}: { src: StaticImageData, href: string }) => {
    return (
        <NextLink className={classes.item} href={href}>
            <NextImage className={classes.image} src={src} alt="asd"/>
        </NextLink>
    )
}

export const SubFooter = () => {
    return (
        <div className={classes.root}>
            <Item src={minobr} href="/"/>
            <Item src={minobrnauki} href="/"/>
            <Item src={rosobrnadzor} href="/"/>
            <Item src={minpros} href="/"/>
            <Item src={gosuslugi} href="/"/>
        </div>
    )
}