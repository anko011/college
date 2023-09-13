import {ActionIcon} from "@mantine/core";
import {IconBrandYandex} from "@tabler/icons-react";
import {fetchUploadToYandex, FileInfo} from "@/entities/files";
import {useNotification} from "@/share/client/hooks";
import {AppError} from "@/share/lib/apiService";

interface UploadToYandexButtonProps {
    file: FileInfo
}

export const UploadToYandexButton = ({file}: UploadToYandexButtonProps) => {
    const notification = useNotification('Сохранение на Yandex Disk')
    const handleClick = async () => {
        try {
            await fetchUploadToYandex(`/${file.path}${file.name}`)
            notification.successNotify(`${file.name} успешно сохранен`)
        } catch (error) {
            if (error instanceof AppError) {
                notification.errorNotify(`Не удалось сохранить ${file.name}`)
                return
            }

            throw error
        }
    }


    return (
        <ActionIcon color="red" onClick={handleClick}>
            <IconBrandYandex/>
        </ActionIcon>
    )
}