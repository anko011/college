import {FileInfo} from "@/entities/files";
import {ActionIcon} from "@mantine/core";
import {IconTrash} from "@tabler/icons-react";

interface DeleteFileButtonProps {
    file: FileInfo
}

export const DeleteFileButton = ({file}: DeleteFileButtonProps) => {
    return (
        <ActionIcon variant="filled" color="red">
            <IconTrash/>
        </ActionIcon>
    )
}