import {Box, Button, FileInput, LoadingOverlay, Stack, Transition} from "@mantine/core";
import {useState} from "react";
import {fetchUploadFile} from "@/entities/files";
import {useAppRouter, useNotification} from "@/share/client/hooks";

interface UploadMultiFilesInputProps {

}

export const UploadMultiFilesInput = () => {
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const router = useAppRouter()
    const notification = useNotification('Загрузка файлов')

    const handleUpload = async () => {
        if (files.length === 0) return
        setIsLoading(true)

        await notification.handlerError(async () => {
            await Promise.all(files.map((file) => fetchUploadFile(file, '')))
        }, 'Успешная загрузка', 'Не удалось загрузить')

        setIsLoading(false)
        await router.safeReload()
    }

    return (
        <Box component={Stack} my="xs">
            <LoadingOverlay visible={isLoading}/>
            <FileInput value={files} onChange={setFiles} multiple placeholder="Выберите загружаемые файлы" clearable/>
            <Transition transition="fade" mounted={files.length !== 0} duration={300}>
                {(styles) => (
                    <Button style={styles} onClick={handleUpload}>Загрузить в текущую директорию</Button>
                )}
            </Transition>
        </Box>
    )
}