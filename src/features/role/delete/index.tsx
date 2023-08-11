import {ActionIcon, Text} from "@mantine/core";
import {modals} from "@mantine/modals";
import {IconTrash} from "@tabler/icons-react";
import {fetchDeleteRole} from "@/entities/role";
import {useAppRouter, useNotification} from "@/share/client/hooks";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {getDeleteRoleDictionary} from "./i18n";

interface DeleteRoleButtonProps {
    roleId: number
}

const deleteRoleDictionary = getDeleteRoleDictionary('ru')
const commonDictionary = getCommonDictionary('ru')


export const DeleteRoleButton = ({roleId}: DeleteRoleButtonProps) => {
    const notification = useNotification(deleteRoleDictionary.notification.title)
    const router = useAppRouter()
    const handleClick = async () => {
        modals.openConfirmModal({
            title: deleteRoleDictionary.modal.title,
            centered: true,
            children: <Text>{deleteRoleDictionary.modal.text}</Text>,
            labels: {
                cancel: commonDictionary.buttons.cancel,
                confirm: commonDictionary.buttons.confirm
            },
            confirmProps: {color: 'red'},
            onConfirm: async () => {
                await notification.handlerError(async () => {
                    await fetchDeleteRole(roleId)
                    await router.safeReload()
                }, deleteRoleDictionary.notification.success, deleteRoleDictionary.notification.error)

            }
        })
    }

    return (
        <ActionIcon color='red' onClick={handleClick}>
            <IconTrash/>
        </ActionIcon>
    )
}