import {ActionIcon, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {fetchDeleteFile} from "@/entities/files";
import {useAppRouter, useNotification} from "@/share/client/hooks";
import {useModals} from "@mantine/modals";
import {AppError} from "@/share/lib/apiService";

interface DeleteFileButtonProps {
    path: string
    name: string
}

export const DeleteFileButton = ({path, name}: DeleteFileButtonProps) => {
    const router = useAppRouter()
    const modal = useModals()
    const notification = useNotification('Удаление файла')

    const handleClick = async () => {
        modal.openConfirmModal({
            title: 'Удаление файла',
            children: <Text>Вы действительно хотите удалить файл?</Text>,
            labels: {cancel: 'Отменить', confirm: 'Удалить'},
            confirmProps: {color: 'red'},
            async onConfirm() {
                try {
                    await fetchDeleteFile(`${path}`)
                    notification.successNotify(`Файл ${name} успешно удален`)
                    await router.safeReload()
                } catch (error) {
                    if (error instanceof AppError) {
                        notification.errorNotify(error.message ?? `Не удалось удалить ${name} файл`)
                        return
                    }

                    throw error
                }
            }
        })
    }

    return (
        <ActionIcon onClick={handleClick} color="red">
            <IconTrash/>
        </ActionIcon>
    )
}