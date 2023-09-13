import {ActionIcon, Tooltip} from "@mantine/core";
import {IconFilePlus} from "@tabler/icons-react";
import {MouseEventHandler} from "react";

export const CreatePageButton = () => {
    const handleClick: MouseEventHandler = (e) => {
        e.stopPropagation()
    }

    return (
        <Tooltip label="Добавить страницу">
            <ActionIcon color="green" onClick={handleClick}>
                <IconFilePlus/>
            </ActionIcon>
        </Tooltip>
    )
}