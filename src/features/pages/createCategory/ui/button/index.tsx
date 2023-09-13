import {ActionIcon, Tooltip} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";

export const CreateCategoryButton = () => {
    return (
        <Tooltip label="Добавить категорию">
            <ActionIcon color="green">
                <IconPlus/>
            </ActionIcon>
        </Tooltip>
    )
}