import {ActionIcon} from "@mantine/core";
import {IconFileDownload} from "@tabler/icons-react";
import NextLink from "next/link";

interface DownloadFileButtonProps {
    url: string
}

export const DownloadFileButton = ({url}: DownloadFileButtonProps) => {
    return (
        <ActionIcon component={NextLink} href={`${url}`} color="blue">
            <IconFileDownload/>
        </ActionIcon>
    )
}