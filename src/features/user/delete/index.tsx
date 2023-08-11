import {ActionIcon, Text} from "@mantine/core";
import {modals} from "@mantine/modals";
import {IconTrash} from "@tabler/icons-react";
import {fetchDeleteUser} from "@/entities/user";
import {useNotification} from "@/share/client/hooks";
import {useAppRouter} from "@/share/client/hooks/useAppRouter";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {getDeleteUserDictionary} from "./i18n";

interface DeleteUserButtonProps {
    userId: number
}

const commonDictionary = getCommonDictionary('ru')
const deleteUserDictionary = getDeleteUserDictionary('ru')


export const DeleteUserButton = ({userId}: DeleteUserButtonProps) => {
    const notification = useNotification(deleteUserDictionary.notification.title)
    const router = useAppRouter()
    const handleClick = async () => {
        modals.openConfirmModal({
            title: deleteUserDictionary.modal.title,
            centered: true,
            children: <Text>Вы действительно хотите удалить пользователя?</Text>,
            labels: {
                cancel: commonDictionary.buttons.cancel,
                confirm: commonDictionary.buttons.confirm
            },
            confirmProps: {color: 'red'},
            onConfirm: async () => {
                await notification.handlerError(async () => {
                    await fetchDeleteUser(userId)
                    await router.safeReload()
                }, deleteUserDictionary.notification.success, deleteUserDictionary.notification.error)
            }
        })
    }

    return (
        <ActionIcon color='red' onClick={handleClick}>
            <IconTrash/>
        </ActionIcon>
    )
}