import {Button} from "@mantine/core";
import {modals} from "@mantine/modals";
import {UploadMultiFilesInput} from "@/features/file";

type UploadMultiFilesButtonProps = {
    currentPathDir: string
}

export const UploadMultiFilesButton = ({currentPathDir}: UploadMultiFilesButtonProps) => {
    const handleClick = () => {
        modals.open({
            title: 'Загрузка файлов',
            children: (
                <>
                    <UploadMultiFilesInput currentPathDir={currentPathDir} onUploadFiles={modals.closeAll}/>
                </>
            )
        })
    }

    return (
        <Button onClick={handleClick}>
            Загрузить файлы
        </Button>
    )
}