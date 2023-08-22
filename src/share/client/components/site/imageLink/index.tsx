import NextLink from "next/link";
import {ComponentType, CSSProperties, ReactNode} from "react";
import cs from 'classnames'
import classes from './styles.module.scss'

type ComponentProps<T extends object> = T extends ComponentType<infer R> ? R : never

type ImageLinkProps = ComponentProps<typeof NextLink> & {
    src: string,
    label?: ReactNode
}
export const ImageLink = ({src, href, label, className, style, ...props}: ImageLinkProps) => {
    return (
        <NextLink
            href={href}
            className={cs(classes.imageLink, className)}
            style={{
                backgroundImage: `url("${src}")`,
                ...style
            } as CSSProperties}
            {...props}
        >
            <span>{label}</span>
        </NextLink>
    )
}