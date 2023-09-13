import {ReactNode, Ref, useCallback, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {ActionButton, Card, Text, Title, Transition} from "@/share/client/components/site";
import classes from './styles.module.scss'
import {IconAlertCircle, IconCheck, IconX} from "@tabler/icons-react";

const SHOW_NOTIFICATION_EVENT_KEY = 'SHOW_NOTIFICATION'
const CLOSE_NOTIFICATION_EVENT_KEY = 'CLOSE_NOTIFICATION'

interface NotificationDetail {
    title: ReactNode
    message: ReactNode
}

class NotificationDetailEvent extends CustomEvent<NotificationDetail> {
    constructor(type: string, detail?: NotificationDetail) {
        super(type, {
            detail,
            bubbles: false,
            cancelable: true,
            composed: false
        });
    }
}

declare global {
    interface WindowEventMap {
        [SHOW_NOTIFICATION_EVENT_KEY]: NotificationDetailEvent
        [CLOSE_NOTIFICATION_EVENT_KEY]: Event
    }
}

export const notifications = {
    show(detail: NotificationDetail) {
        window.dispatchEvent(new NotificationDetailEvent(SHOW_NOTIFICATION_EVENT_KEY, detail))
    },
    showSuccess(title: string, message: ReactNode) {
        window.dispatchEvent(new NotificationDetailEvent(SHOW_NOTIFICATION_EVENT_KEY, {
            title: (
                <>
                    <IconCheck color="green"/>
                    <Title order={4}>
                        {title}
                    </Title>
                </>
            ),
            message: typeof message === 'string' ? <Text>{message}</Text> : message
        }))
    },
    showError(title: string, message: ReactNode) {
        window.dispatchEvent(new NotificationDetailEvent(SHOW_NOTIFICATION_EVENT_KEY, {
            title: (
                <>
                    <IconAlertCircle color="red"/>
                    <Title order={4}>
                        {title}
                    </Title>
                </>
            ),
            message: typeof message === 'string' ? <Text>{message}</Text> : message
        }))
    },
    close() {
        window.dispatchEvent(new NotificationDetailEvent(CLOSE_NOTIFICATION_EVENT_KEY))
    }
}

export const Notification = () => {
    const container = useRef<HTMLDivElement | null>(null)
    const [isShow, setIsShow] = useState(false)
    const [detail, setDetail] = useState<NotificationDetail | null>(null)

    const show = useCallback((evt: NotificationDetailEvent) => {
        setTimeout(close, 1500)
        setDetail(evt.detail)
        setIsShow(true)
    }, [])

    const close = useCallback(() => {
        setIsShow(false)
    }, [])


    useEffect(() => {
        container.current = document.querySelector('#site-context') as HTMLDivElement
    }, []);

    useEffect(() => {
        window.addEventListener(SHOW_NOTIFICATION_EVENT_KEY, show)
        window.addEventListener(CLOSE_NOTIFICATION_EVENT_KEY, close)

        return () => {
            window.removeEventListener(SHOW_NOTIFICATION_EVENT_KEY, show)
            window.removeEventListener(CLOSE_NOTIFICATION_EVENT_KEY, close)
        }
    }, [])

    if (!container.current || !detail) return null

    return createPortal((
        <Transition state={isShow} duration={300} classes={['123', classes.exit]}>
            {(ref) => (
                <Card
                    className={classes.root}
                    ref={ref as Ref<HTMLDivElement>}
                    header={(
                        <>
                            {detail.title}
                            <ActionButton onClick={close} className={classes.closeButton}>
                                <IconX/>
                            </ActionButton>
                        </>
                    )}
                >
                    {detail.message}
                </Card>)
            }
        </Transition>
    ), container.current)
}



