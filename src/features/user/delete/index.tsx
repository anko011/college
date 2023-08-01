import {ActionIcon, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {fetchDeleteUser} from "@/entities/user";
import {useNotification} from "@/share/client/hooks";
import {getDeleteUserFeautureDictionary} from "@/features/user/delete/i18n";
import {modals} from "@mantine/modals";

interface DeleteUserButtonProps {
    userId: number

    onDeleteUser?(): void
}

const dictionary = getDeleteUserFeautureDictionary('ru')


export const DeleteUserButton = ({userId, onDeleteUser}: DeleteUserButtonProps) => {
    const notification = useNotification(dictionary.notification.title)

    const handleClick = async () => {
        modals.openConfirmModal({
            title: dictionary.modal.title,
            children: <Text>Вы действительно хотите удалить пользователя?</Text>,
            labels: {
                cancel: dictionary.modal.buttons.cancel,
                confirm: dictionary.modal.buttons.confirm
            },
            confirmProps: {
                color: 'red'
            },
            centered: true,
            onConfirm: async () => {
                const response = await fetchDeleteUser(userId)
                const data = await response.json()

                if (!response.ok) {
                    notification.errorNotify(data?.message ?? dictionary.notification.error)
                } else {
                    notification.successNotify(dictionary.notification.success)
                    onDeleteUser?.()
                }
            }
        })
    }

    return (
        <ActionIcon color='red' onClick={handleClick}>
            <IconTrash/>
        </ActionIcon>
    )
}