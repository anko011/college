import {ActionIcon, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {fetchDeleteUser} from "@/entities/user";
import {useHTTPNotification} from "@/share/client/hooks";
import {getDeleteUserFeautureDictionary} from "@/features/user/delete/i18n";
import {modals} from "@mantine/modals";

interface DeleteUserButtonProps {
    userId: number
}

const dictionary = getDeleteUserFeautureDictionary('ru')


export const DeleteUserButton = ({userId}: DeleteUserButtonProps) => {
    const notification = useHTTPNotification('Удаление пользователя')

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

                if (response) {
                    notification.errorNotify(response.message)
                } else {
                    notification.successNotify(dictionary.notification.success)
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