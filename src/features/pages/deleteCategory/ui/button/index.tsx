import {ActionIcon, Tooltip} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";

export const DeleteCategoryButton = () => {
    return (
        <Tooltip label="Удалить категорию">
            <ActionIcon color="red">
                <IconTrash/>
            </ActionIcon>
        </Tooltip>
    )
}