import {MutableRefObject, ReactNode, useRef, useState} from "react";

interface TransitionProps {
    state: boolean
    children: (ref: MutableRefObject<HTMLElement | null>) => ReactNode
    duration: number,
    classes: [string?, string?, string?, string?]
}


export const Transition = ({children, state, duration, classes}: TransitionProps) => {
    const [isShow, setIsShow] = useState(false)
    const ref = useRef<HTMLElement | null>(null)

    const toggleAnimateState = (from: string, forceClose: boolean = false) => {
        setTimeout(() => {
            if (ref.current) ref.current.classList.add(from)
        }, 0)

        setTimeout(() => {
            if (forceClose) {
                setIsShow(false)
            }
        }, duration)
    }

    if (state && !isShow) {
        setIsShow(true)
        toggleAnimateState(classes.at(0) ?? 'from-start')
    }

    if (!state && isShow) {
        toggleAnimateState(classes.at(1) ?? 'from-end', true)
    }

    if (isShow) return children(ref)
}