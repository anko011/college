import {ActionIcon, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {fetchDeleteUser} from "@/entities/user";
import {useNotification} from "@/share/client/hooks";
import {getDeleteUserFeautureDictionary} from "@/features/user/delete/i18n";
import {modals} from "@mantine/modals";
import {useAppRouter} from "@/share/client/hooks/useAppRouter";

interface DeleteUserButtonProps {
    userId: number
}

const dictionary = getDeleteUserFeautureDictionary('ru')


export const DeleteUserButton = ({userId}: DeleteUserButtonProps) => {
    const notification = useNotification(dictionary.notification.title)
    const router = useAppRouter()
    const handleClick = async () => {
        modals.openConfirmModal({
            title: dictionary.modal.title,
            centered: true,
            children: <Text>Вы действительно хотите удалить пользователя?</Text>,
            labels: {
                cancel: dictionary.modal.buttons.cancel,
                confirm: dictionary.modal.buttons.confirm
            },
            confirmProps: {color: 'red'},
            onConfirm: async () => {
                await notification.handlerError(async () => {
                    await fetchDeleteUser(userId)
                }, dictionary.notification.success, dictionary.notification.error)

                await router.safeReload()
            }
        })
    }

    return (
        <ActionIcon color='red' onClick={handleClick}>
            <IconTrash/>
        </ActionIcon>
    )
}