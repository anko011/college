import {ActionIcon} from "@mantine/core";
import {IconFileDownload} from "@tabler/icons-react";
import {FileInfo} from "@/entities/files";
import NextLink from "next/link";

interface DownloadFileButtonProps {
    file: FileInfo
}

export const DownloadFileButton = ({file}: DownloadFileButtonProps) => {
    return (
        <ActionIcon component={NextLink} href='/admin' variant="filled" color="blue">
            <IconFileDownload/>
        </ActionIcon>
    )
}