import {JSX} from "react";
import cs from "classnames";
import classes from './styles.module.scss'

type ButtonProps = JSX.IntrinsicElements['button']

export const Button = ({className, ...props}: ButtonProps) => {
    return <button className={cs(className, classes.root)} {...props}/>
}