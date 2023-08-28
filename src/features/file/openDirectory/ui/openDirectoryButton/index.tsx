import {Button} from "@mantine/core";
import {DirInfo} from "@/entities/files";
import {useOpenDirectory} from "@/features/file";

interface OpenDirectoryButtonProps {
    dir: DirInfo
}

export const OpenDirectoryButton = ({dir}: OpenDirectoryButtonProps) => {
    const {open} = useOpenDirectory()
    const handleClick = () => {
        open(dir)
    }

    return (
        <Button onClick={handleClick} variant="subtle">
            Открыть папку
        </Button>
    )
}