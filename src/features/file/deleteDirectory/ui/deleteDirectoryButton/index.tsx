import {ActionIcon, Text} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";
import {useAppRouter, useNotification} from "@/share/client/hooks";
import {modals} from "@mantine/modals";
import {fetchDeleteDirectory} from "@/entities/files";
import {AppError} from "@/share/lib/apiService";

type DeleteDirectoryButtonProps = {
    path: string
    name: string
}

export const DeleteDirectoryButton = ({path, name}: DeleteDirectoryButtonProps) => {
    const router = useAppRouter()
    const notification = useNotification('Удаление папки')

    const handleClick = () => {
        modals.openConfirmModal({
            title: 'Удаление папки',
            children: <Text>Вы действительно хотите удалить директорию? Все вложенные папки и файлы будут
                удалены</Text>,
            labels: {cancel: 'Отменить', confirm: 'Удалить'},
            confirmProps: {color: 'red'},
            async onConfirm() {
                try {
                    await fetchDeleteDirectory(`${path}`)
                    notification.successNotify(`Директория ${name} успешно удалена`)
                    await router.safeReload()
                } catch (error) {

                    if (error instanceof AppError) {
                        notification.errorNotify(error.message ?? `Не удалось удалить директорию ${name}`)
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