import classes from "./styles.module.scss";
import Image from "next/image";
import cs from "classnames";
import {Title} from "@/share/client/components/site/title";
import {ReactNode} from "react";


interface HeaderProps {
    className?: string
    children?: ReactNode
}

export const Header = ({className, children}: HeaderProps) => {
    return (
        <header className={cs(classes.root, className)}>
            <Title className={classes.title}>Забайкальский горный колледж им. М.И. Агошкова</Title>
            <Image className={classes.image} src="/agoshkov.png" alt="asdf" width={100} height={123}/>
            <div className={classes.menu}>
                {children}
            </div>
        </header>
    )
}
