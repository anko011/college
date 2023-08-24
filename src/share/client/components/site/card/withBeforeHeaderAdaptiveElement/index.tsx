import {ComponentType, ReactNode} from "react";
import cs from 'classnames'
import {CardProps} from "../";
import classes from './styles.module.scss'

interface WithBeforeHeaderAdaptiveElement extends CardProps {
    beforeElement?: ReactNode
}

export const withBeforeAdaptiveElement = (Component: ComponentType<CardProps>) => {
    const WithMoreLinkComponent = function (
        {
            header,
            className,
            beforeElement,
            footer,
            ...props
        }: WithBeforeHeaderAdaptiveElement) {
        return <Component
            className={cs(classes.root, className)}
            header={(
                <>
                    {header}
                    <span className={classes.headerBeforeElement}>{beforeElement}</span>
                </>
            )}
            footer={(
                <>
                    {footer}
                    <span className={classes.footerBeforeElement}>{beforeElement}</span>
                </>
            )}
            {...props}
        />
    }

    return WithMoreLinkComponent
}