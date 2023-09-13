import {Anchor} from "@mantine/core";
import {useOpenDirectory} from "@/features/file";
import {MouseEventHandler} from "react";

interface OpenDirectoryLinkProps {
    path: string
    name: string
}

export const OpenDirectoryLink = ({path, name}: OpenDirectoryLinkProps) => {
    const {openByPath} = useOpenDirectory()
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.stopPropagation()
        openByPath(path)
    }

    return <Anchor onClick={handleClick}>{name}</Anchor>
}