import {ActionIcon} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";

export function DeleteUserButton() {
    return (
        <ActionIcon color='red'>
            <IconTrash/>
        </ActionIcon>
    )
}