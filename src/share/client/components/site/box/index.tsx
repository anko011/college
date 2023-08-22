import cs from 'classnames'
import classes from './styles.module.scss'
import {ReactNode} from "react";

interface BoxProps {
    children?: ReactNode
    className?: string
}

export const Box = ({className, children}: BoxProps) => {
    return (
        <div className={cs(classes.root, className)}>
            {children}
        </div>
    )
}