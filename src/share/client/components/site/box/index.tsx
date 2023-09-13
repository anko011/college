import cs from 'classnames'
import classes from './styles.module.scss'
import {ForwardedRef, forwardRef, ReactNode} from "react";

interface BoxProps {
    children?: ReactNode
    className?: string
}

export const render = ({className, children}: BoxProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div className={cs(classes.root, className)} ref={ref}>
            {children}
        </div>
    )
}

export const Box = forwardRef(render)