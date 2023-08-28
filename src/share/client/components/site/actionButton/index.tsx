import {JSX} from "react";
import cs from 'classnames'
import classes from './styles.module.scss'

type ActionButtonProps = JSX.IntrinsicElements['button']

export const ActionButton = ({className, ...props}: ActionButtonProps) => {
    return <button className={cs(classes.root, className)} {...props} />
}