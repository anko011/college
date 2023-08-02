import {ActionIcon, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {fetchDeleteUser} from "@/entities/user";
import {useNotification} from "@/share/client/hooks";
import {getDeleteUserFeautureDictionary} from "@/features/user/delete/i18n";
import {modals} from "@mantine/modals";
import {useRouter} from "next/router";

interface DeleteUserButtonProps {
    userId: number
}

const dictionary = getDeleteUserFeautureDictionary('ru')


export const DeleteUserButton = ({userId}: DeleteUserButtonProps) => {
    const notification = useNotification(dictionary.notification.title)
    const router = useRouter()
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
                const response = await fetchDeleteUser(userId)
                const data = await response.json()

                notification.byResponseNotify(response, dictionary.notification.success, data.message ?? dictionary.notification.error)
                router.replace(router.asPath)
            }
        })
    }

    return (
        <ActionIcon color='red' onClick={handleClick}>
            <IconTrash/>
        </ActionIcon>
    )
}