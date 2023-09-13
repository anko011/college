import {ReactNode, useRef, useState} from "react";
import classes from './styles.module.scss'
import {IconMenu2, IconX} from "@tabler/icons-react";
import {Logo} from "@/share/client/components";
import {Divider} from "@/share/client/components/site";
import {useScroll} from "@/share/client/hooks";


interface LeftMenuSectionProps {
    className?: string
    children?: (isOpenDrawer: boolean) => ReactNode
}

export const LeftMenuSection = ({className, children}: LeftMenuSectionProps) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const scroll = useScroll()
    const ref = useRef<HTMLDivElement>(null)

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true)
        scroll.block()
    }

    const closeDrawer = () => {
        if (ref.current) {
            ref.current.classList.add(classes.exitMenu)
            scroll.unblock()
            setTimeout(() => {
                setIsOpenDrawer(false)
            }, 300)
        }
    }

    return (
        <nav className={className}>
            <button onClick={handleOpenDrawer} className={classes.openDrawerButton}>
                <IconMenu2/>
            </button>
            <div className={isOpenDrawer ? classes.compact : classes.root} ref={ref}>
                {isOpenDrawer && <button onClick={closeDrawer} className={classes.closeDrawerButton}><IconX/></button>}
                <Logo/>
                <Divider/>
                {children?.(isOpenDrawer)}
            </div>
        </nav>
    )
}