import {MutableRefObject, ReactNode, useRef, useState} from "react";

interface TransitionProps<T extends HTMLElement>{
    state: boolean
    children: (ref: MutableRefObject<T | null>) => ReactNode
    duration: number,
    classes: [string?, string?, string?, string?]
}


export const Transition = <T extends HTMLElement>({children, state, duration, classes}: TransitionProps<T>) => {
    const [isShow, setIsShow] = useState(false)
    const ref = useRef<T | null>(null)

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