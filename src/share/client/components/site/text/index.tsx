import {JSX} from "react";
import {Inter} from "next/font/google";
import cs from "classnames";
import classes from './styles.module.scss'

const inter = Inter({preload: true, subsets: ['cyrillic']})

type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type TextProps = JSX.IntrinsicElements['span'] & {
    bold?: boolean
    size?: FontSize
}

const fontSizeClasses: { [key in FontSize]: string } = {
    xs: classes.xs,
    sm: classes.sm,
    md: classes.md,
    lg: classes.lg,
    xl: classes.xl
}

export const Text = ({className, bold = false, size = 'xs', ...props}: TextProps) => {
    return <span className={cs(inter.className, className, bold && classes.bold, fontSizeClasses[size])} {...props}/>
}