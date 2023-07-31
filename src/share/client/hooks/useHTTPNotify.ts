import {useNotify} from "@/share/client/hooks/useNotify";

//TODO: replace useHTTPNotify to useHTTPNotification

export function useHTTPNotify(title: string, successMessage?: string, errorMessage?: string) {
    const notification = useNotify()

    return (status: number) => {
        if (status === 200 || status === 201) {
            notification.show({title, message: successMessage, color: 'green', pageReload: 500})
        } else {
            notification.show({title, message: errorMessage, color: 'red'})
        }
    }
}

export function useHTTPNotification(title: string) {
    const notification = useNotify()

    return ({
        successNotify(message: string) {
            notification.show({title, message, color: 'green', pageReload: 500})
        },
        errorNotify(message: string) {
            notification.show({title, message, color: 'red'})
        },
        byStatusNotify(status: boolean | number, successMessage: string, errorMessage: string) {
            if (status === 200 || status === 201 || status) {
                this.successNotify(successMessage)
            } else {
                this.errorNotify(errorMessage)
            }
        }
    })
}
