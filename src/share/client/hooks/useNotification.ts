import {notifications} from "@mantine/notifications";

export function useNotification(title: string) {

    return ({
        successNotify(message: string) {
            notifications.show({title, message, color: 'green'})
        },
        errorNotify(message: string) {
            notifications.show({title, message, color: 'red'})
        },
        async handlerError(executor: () => void, messageSuccess: string, errorMessage: string) {
            try {
                await executor()
                this.successNotify(messageSuccess)
            } catch (error) {
                if (error instanceof Error) {
                    this.errorNotify(error.message ?? errorMessage)
                } else {
                    throw error
                }
            }

        }
    })
}
