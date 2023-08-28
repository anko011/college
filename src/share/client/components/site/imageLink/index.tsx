import NextLink from "next/link";
import {ComponentType, ReactNode} from "react";
import cs from 'classnames'
import classes from './styles.module.scss'
import NextImage from "next/image";

type ComponentProps<T extends object> = T extends ComponentType<infer R> ? R : never

type ImageLinkProps = ComponentProps<typeof NextLink> & {
    src: string,
    alt: string,
    width?: number,
    height?: number,
    label?: ReactNode
    sizes?: string
    priority?: boolean
    fill?: boolean
}
export const ImageLink = (
    {
        src,
        alt,
        href,
        label,
        className,
        sizes,
        width,
        height,
        fill,
        priority,
        ...props
    }: ImageLinkProps) => {
    return (
        <NextLink
            href={href}
            className={cs(classes.link, className)}
            {...props}
        >
            <NextImage
                className={classes.image}
                src={src}
                alt={alt}
                width={width}
                height={height}
                fill={fill}
                priority={priority}
                sizes={sizes ?? '100vw'}
                data-image-link-image
            />
            <div className={classes.blinkPanel}>
                {label}
            </div>

        </NextLink>
    )
}