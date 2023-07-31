import {NotificationProps, notifications} from "@mantine/notifications";
import {useRouter} from "next/router";

export function useNotify() {
    const router = useRouter()

    return {
        ...notifications,
        show({pageReload = 0, ...props}: NotificationProps & {
            pageReload?: number
        }) {
            notifications.show(props)

            if (pageReload !== 0) {
                setTimeout(() => router.reload(), pageReload)
            }
        }
    }
}
