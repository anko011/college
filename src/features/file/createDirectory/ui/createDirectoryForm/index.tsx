import {useAppRouter, useNotification} from "@/share/client/hooks";
import {isNotEmpty, useForm} from "@mantine/form";
import {fetchCreateDirectory} from "@/entities/files";
import {AppError} from "@/share/lib/apiService";
import {Button, Group, Stack, TextInput} from "@mantine/core";
import {modals} from "@mantine/modals";

type CreateDirectoryFormProps = {
    currentDirPath: string
    onCreate?: () => void
}

export const CreateDirectoryForm = ({currentDirPath, onCreate}: CreateDirectoryFormProps) => {
    const notification = useNotification('Создание директории')
    const router = useAppRouter()
    const form = useForm({
        initialValues: {
            dirName: ''
        },
        validate: {
            dirName: isNotEmpty('Обязательное поле')
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await fetchCreateDirectory(`${currentDirPath}/${values.dirName}`)
            notification.successNotify(`Директория ${values.dirName} успешно создана`)
            onCreate?.()
            await router.safeReload()
        } catch (error) {
            if (error instanceof AppError) {
                notification.errorNotify(`Не удалось создать директорию ${values.dirName}`)
                return
            }
            throw error
        }
        form.reset()
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput placeholder="Введите название директории" {...form.getInputProps('dirName')}/>
                <Group position="right">
                    <Button onClick={() => modals.closeAll()} variant="default">Отменить</Button>
                    <Button type="submit">Создать</Button>
                </Group>
            </Stack>
        </form>
    )
}