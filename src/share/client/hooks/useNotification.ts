import {notifications} from "@mantine/notifications";

export function useNotification(title: string) {

    return ({
        successNotify(message: string) {
            notifications.show({title, message, color: 'green'})
        },
        errorNotify(message: string) {
            notifications.show({title, message, color: 'red'})
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
