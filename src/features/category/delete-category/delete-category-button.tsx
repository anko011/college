import {ActionIcon, Text} from "@mantine/core";
import {modals} from '@mantine/modals'
import {IconTrash} from "@tabler/icons-react";
import {deleteCategory} from "@/entities/category/api";
import {useHTTPNotify} from "../../../share/client/hooks";

interface DeleteCategoryButtonProps {
    categoryId: number
}

export function DeleteCategoryButton({categoryId}: DeleteCategoryButtonProps) {
    const notification = useHTTPNotify(
        'Удаление категории',
        'Категория успешно удалена',
        'Не удалось удалить категорию'
    )


    const handleClick = () => {
        modals.openConfirmModal({
            title: 'Удаление категории',
            children: (
                <Text>Внимание! Удаление категории приведет к удалению всех связанных с ней страниц.</Text>
            ),
            labels: {confirm: 'Удалить', cancel: 'Отмена'},
            confirmProps: {
                color: 'red'
            },
            onConfirm: async () => {
                const status = await deleteCategory(categoryId)
                notification(status)
            }
        })
    }

    return (
        <ActionIcon onClick={handleClick} color='red'>
            <IconTrash/>
        </ActionIcon>
    )
}
