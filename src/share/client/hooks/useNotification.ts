import {notifications} from "@mantine/notifications";
import {BackendResponse} from "../../lib/apiService";

export function useNotification(title: string) {

    return ({
        successNotify(message: string) {
            notifications.show({title, message, color: 'green'})
        },
        errorNotify(message: string) {
            notifications.show({title, message, color: 'red'})
        },
        byResponseNotify(response: BackendResponse<any>, messageSuccess: string, messageError: string): void {
            if (response.ok) {
                this.successNotify(messageSuccess)
            } else {
                this.errorNotify(messageError)
            }
        }
    })
}
