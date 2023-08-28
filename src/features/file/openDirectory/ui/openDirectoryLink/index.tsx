import {Anchor} from "@mantine/core";
import {DirInfo} from "@/entities/files";
import {useOpenDirectory} from "@/features/file";

interface OpenDirectoryLinkProps {
    dir: DirInfo
}

export const OpenDirectoryLink = ({dir}: OpenDirectoryLinkProps) => {
    const {open} = useOpenDirectory()
    const handleClick = () => open(dir)

    return <Anchor onClick={handleClick}>{dir.name}</Anchor>
}