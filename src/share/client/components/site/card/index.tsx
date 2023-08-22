import {ReactNode} from "react";
import cs from 'classnames';
import {Box} from "../box";
import {Divider} from "../divider";
import classes from './styles.module.scss'


interface CardProps {
    header?: ReactNode
    footer?: ReactNode
    children?: ReactNode
    className?: string
}

export const Card = ({className, header, footer, children}: CardProps) => {
    return (
        <Box className={cs(classes.root, className)}>
            {header && <header className={classes.header} data-card-header>{header}</header>}
            {header && (footer || children) && <Divider data-card-divider-header/>}
            {children && <div className={classes.content} data-card-content>{children}</div>}
            {footer && (header || children) && <Divider data-card-divider-footer/>}
            {footer && <footer className={classes.footer} data-card-footer>{footer}</footer>}
        </Box>
    )
}