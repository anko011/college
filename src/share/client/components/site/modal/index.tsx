import {MouseEventHandler, ReactNode, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import cs from "classnames";
import {Box} from "@/share/client/components/site";
import {Transition} from "@/share/client/components/site/transition";
import classes from './styles.module.scss'
import {useScroll} from "@/share/client/hooks";
import {ActionButton} from "@/share/client/components/site/actionButton";
import {IconX} from "@tabler/icons-react";

interface ModalProps {
    isOpen: boolean
    children: ReactNode
    onCloseModal: () => void
}


export const Modal = ({isOpen, children, onCloseModal}: ModalProps) => {
    const scroll = useScroll()
    const wrapperRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if (isOpen) {
            scroll.block()
        }

        if (!isOpen) {
            scroll.unblock()
        }
    }, [isOpen]);

    if (typeof window === 'undefined') return null
    const container = document.querySelector('#site-context')
    if (!container) return null
    const handleClose: MouseEventHandler = (evt) => {
        if (wrapperRef.current && evt.target === wrapperRef.current) {
            onCloseModal()
        }
    }

    return createPortal((
        <Transition state={isOpen} duration={300} classes={[classes.fromStart, classes.fromEnd]}>
            {(ref) => (
                <dialog
                    className={classes.wrapper}
                    onClick={handleClose}
                    ref={(instance) => {
                        ref.current = instance
                        wrapperRef.current = instance
                    }}
                >
                    <Box className={cs(classes.root)}>
                        <ActionButton className={classes.exitButton} onClick={onCloseModal}><IconX/></ActionButton>
                        {children}
                    </Box>
                </dialog>
            )}
        </Transition>
    ), container)
}


