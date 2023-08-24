import {ReactNode} from "react";
import {Box} from "../box";
import {Divider} from "../divider";

export {withBeforeAdaptiveElement} from './withBeforeHeaderAdaptiveElement'

export interface CardProps {
    header?: ReactNode
    footer?: ReactNode
    children?: ReactNode
    className?: string
}

export const Card = ({className, header, footer, children}: CardProps) => {
    return (
        <Box className={className}>
            {header && <header data-card-header>{header}</header>}
            {header && (footer || children) && <Divider data-card-divider-header/>}
            {children && <div data-card-content>{children}</div>}
            {footer && (header || children) && <Divider data-card-divider-footer/>}
            {footer && <footer data-card-footer>{footer}</footer>}
        </Box>
    )
}