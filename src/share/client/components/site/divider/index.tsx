import cs from 'classnames'
import classes from './styles.module.scss'
import {JSX} from "react";

type DividerProps = JSX.IntrinsicElements['div']

export const Divider = ({className, ...props}: DividerProps) => {
    return <div className={cs(classes.root, className)} {...props}/>
}