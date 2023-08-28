import {FileInfo} from "@/entities/files";
import {Anchor} from "@mantine/core";
import NextLink from "next/link";

interface OpenFileLinkProps {
    file: FileInfo
}

export const OpenFileLink = ({file}: OpenFileLinkProps) => {
    return (
        <Anchor component={NextLink} href={`${file.url}`}>
            {file.name}
        </Anchor>
    )
}