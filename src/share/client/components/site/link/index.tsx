import {ComponentType, forwardRef} from "react";
import NextLink from "next/link";
import cs from "classnames";
import classes from './styles.module.scss'

type ComponentProps<T extends object> = T extends ComponentType<infer R> ? R : never

type LinkProps = ComponentProps<typeof NextLink> & {
    underline?: boolean
}

const AppLink = forwardRef<HTMLAnchorElement, LinkProps>(({className, underline = false, ...props}, ref) =>
    <NextLink
        className={cs(classes.root, className, underline && classes.underline)}
        {...props}
        ref={ref}/>)

AppLink.displayName = "Link"

export const Link = AppLink
