import {JSX} from "react";
import cs from "classnames";
import classes from './styles.module.scss'

type LoaderProps = JSX.IntrinsicElements['div']

export const Loader = ({className, ...props}: LoaderProps) => {
    return <div className={cs(classes.root, className)} {...props}/>
}