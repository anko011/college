import {ForwardedRef, forwardRef, ReactNode} from "react";
import {Box} from "../box";
import {Divider} from "../divider";

export {withBeforeAdaptiveElement} from './withBeforeHeaderAdaptiveElement'

export interface CardProps {
    header?: ReactNode
    footer?: ReactNode
    children?: ReactNode
    className?: string
}

const render = ({className, header, footer, children}: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <Box className={className} ref={ref}>
            {header && <header data-card-header>{header}</header>}
            {header && (footer || children) && <Divider data-card-divider-header/>}
            {children && <div data-card-content>{children}</div>}
            {footer && (header || children) && <Divider data-card-divider-footer/>}
            {footer && <footer data-card-footer>{footer}</footer>}
        </Box>
    )
}

export const Card = forwardRef(render)