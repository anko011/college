import {ActionIcon, Text} from "@mantine/core";
import {modals} from "@mantine/modals";
import {IconTrash} from "@tabler/icons-react";
import {useHTTPNotify} from "../../../share/client/hooks";
import {deletePage} from "@/entities/page/api";

interface DeletePageButtonProps {
    pageId: number
}

export function DeletePageButton({pageId}: DeletePageButtonProps) {
    const notification = useHTTPNotify(
        'Удаление страницы',
        'Удаление страницы прошло успешно',
        'Не удалось удалить страницу'
    )

    const handleConfirm = async () => {
        const status = await deletePage(pageId)
        notification(status)
    }

    const handleClick = () => {
        modals.openConfirmModal({
            title: 'Удаление страницы',
            children: (
                <Text>Вы действительно хотите удалить страницу?</Text>
            ),
            labels: {confirm: 'Удалить', cancel: 'Отмена'},
            confirmProps: {color: 'red'},
            onConfirm: handleConfirm
        })
    }

    return (
        <ActionIcon onClick={handleClick} color='red'>
            <IconTrash/>
        </ActionIcon>
    )
}
