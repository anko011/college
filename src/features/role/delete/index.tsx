import {ActionIcon, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {useNotification} from "@/share/client/hooks";
import {modals} from "@mantine/modals";
import {useAppRouter} from "@/share/client/hooks/useAppRouter";
import {getDeleteRoleFeautureDictionary} from "@/features/role/delete/i18n";
import {fetchDeleteRole} from "@/entities/role";

interface DeleteRoleButtonProps {
    roleId: number
}

const dictionary = getDeleteRoleFeautureDictionary('ru')


export const DeleteRoleButton = ({roleId}: DeleteRoleButtonProps) => {
    const notification = useNotification(dictionary.notification.title)
    const router = useAppRouter()
    const handleClick = async () => {
        modals.openConfirmModal({
            title: dictionary.modal.title,
            centered: true,
            children: <Text>{dictionary.modal.text}</Text>,
            labels: {
                cancel: dictionary.modal.buttons.cancel,
                confirm: dictionary.modal.buttons.confirm
            },
            confirmProps: {color: 'red'},
            onConfirm: async () => {
                await notification.handlerError(async () => {
                    await fetchDeleteRole(roleId)
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