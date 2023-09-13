import {ActionIcon, Tooltip} from "@mantine/core";
import {IconPencil} from "@tabler/icons-react";

export const EditPageButton = () => {
    return (
        <Tooltip label="Редактировать страницу">
            <ActionIcon color="blue">
                <IconPencil/>
            </ActionIcon>
        </Tooltip>
    )
}