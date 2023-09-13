import {Box, Button, FileInput, LoadingOverlay, Stack, Transition} from "@mantine/core";
import {useState} from "react";
import {fetchUploadFile} from "@/entities/files";
import {useAppRouter, useNotification} from "@/share/client/hooks";
import {AppError} from "@/share/lib/apiService";

interface UploadMultiFilesInputProps {
    currentPathDir: string
    onUploadFiles?: () => void
}

export const UploadMultiFilesInput = ({currentPathDir, onUploadFiles}: UploadMultiFilesInputProps) => {
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const router = useAppRouter()
    const notification = useNotification('Загрузка файлов')

    const handleUpload = async () => {
        if (files.length === 0) return
        setIsLoading(true)

        const promises = files.map(file => async () => {
            try {
                await fetchUploadFile(file, currentPathDir)
                notification.successNotify(`Файл ${file.name} успешно загружен`)
            } catch (error) {
                if (error instanceof AppError) {
                    notification.errorNotify(`Не удалось загрузить ${file.name}`)
                    return
                }

                throw error
            }
        }).map(item => item())

        await Promise.all(promises)

        setIsLoading(false)
        onUploadFiles?.()
        await router.safeReload()
    }

    return (
        <Box component={Stack} my="xs">
            <LoadingOverlay visible={isLoading}/>
            <FileInput value={files} onChange={setFiles} multiple placeholder="Выберите загружаемые файлы"
                       clearable/>
            <Transition transition="fade" mounted={files.length !== 0} duration={300}>
                {(styles) => (
                    <Button style={styles} onClick={handleUpload}>Загрузить в текущую директорию</Button>
                )}
            </Transition>
        </Box>
    )
}