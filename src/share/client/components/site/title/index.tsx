import {DetailedHTMLProps, HTMLAttributes} from "react";
import {Bitter} from "next/font/google";
import cs from 'classnames'
import classes from './styles.module.scss'

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type TitleProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
    order?: 1 | 2 | 3 | 4 | 5 | 6
    size?: TitleSize
}

const bitter = Bitter({preload: true, subsets: ['cyrillic']})

const sizeClasses: { [key in TitleSize]: string } = {
    xs: classes.xs,
    sm: classes.sm,
    md: classes.md,
    lg: classes.lg,
    xl: classes.xl
}

export const Title = ({order = 1, size = 'xs', className, ...props}: TitleProps) => {
    const Tag = `h${order}`
    return (
        // @ts-ignore
        <Tag className={cs(bitter.className, sizeClasses[size], className)} {...props} />
    )
}