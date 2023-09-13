import {Button} from "@mantine/core";
import {modals} from "@mantine/modals";
import {CreateDirectoryForm} from "@/features/file/createDirectory/ui/createDirectoryForm";

type CreateDirectoryButtonProps = {
    currentDirPath: string
}

export const CreateDirectoryButton = ({currentDirPath}: CreateDirectoryButtonProps) => {
    const handleClick = () => {
        modals.open({
            title: 'Создание директории',
            children: <CreateDirectoryForm currentDirPath={currentDirPath} onCreate={modals.closeAll}/>
        })
    }

    return (
        <Button onClick={handleClick}>
            Создать директорию
        </Button>
    )
}