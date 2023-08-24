import NextLink from "next/link";
import classes from './styles.module.scss'

const Item = ({src, href}: { src: string, href: string }) => {
    return (
        <NextLink className={classes.item} href={href} style={{background: `no-repeat url("${src}")`}}/>
    )
}

export const SubFooter = () => {
    return (
        <div className={classes.root}>
            <Item src="/minobr.png" href="/"/>
            <Item src="/minobrnauki.png" href="/"/>
            <Item src="/rosobrnadzor.png" href="/"/>
            <Item src="/minpros.png" href="/"/>
            <Item src="/gosuslugi.png" href="/"/>
        </div>
    )
}