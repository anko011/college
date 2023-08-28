import {JSX, useEffect, useRef} from "react";
import cs from "classnames";
import classes from './styles.module.scss'

type OverlayProps = JSX.IntrinsicElements['div']

export const Overlay = ({className, ...props}: OverlayProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const parent = ref.current.parentElement
        if (!parent) return;

        const position = parent.style.position
        const overflow = parent.style.overflow


        parent.style.position = 'relative'

        return () => {
            parent.style.position = position
        }
    }, [ref.current])

    return <div className={cs(classes.root, className)} ref={ref} {...props}/>
}