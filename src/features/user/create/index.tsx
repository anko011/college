import {Box, Button, Group, LoadingOverlay, Stack} from "@mantine/core";
import {Role} from "@/entities/role";
import {fetchCreateUser} from "@/entities/user";
import {
    BaseUserFormFields,
    baseUserFormFieldsValidate,
    BaseUserFormProvider,
    useBaseUserForm
} from "@/entities/user/client";
import {useNotification} from "@/share/client/hooks";
import {getUserCreateFeatureDictionary} from "./i18n";
import {mapToCreateUserDto} from "./lib";
import {useState} from "react";

interface UserCreateFormProps {
    roles: Role[]
}

const dictionary = getUserCreateFeatureDictionary('ru')

export function UserCreateForm({roles}: UserCreateFormProps) {
    const notification = useNotification(dictionary.notification.title)
    const [isShowLoader, setIsShowLoader] = useState(false)
    const form = useBaseUserForm({
        initialValues: {
            firstName: '',
            secondName: '',
            patronymic: '',
            login: '',
            password: '',
            roleId: ''
        },
        validate: baseUserFormFieldsValidate
    })

    const handleSubmit = async (values: typeof form.values) => {
        setIsShowLoader(true)
        await notification.handlerError(async () => {
            await fetchCreateUser(mapToCreateUserDto(values))
        }, dictionary.notification.success, dictionary.notification.error)
        form.reset()
        setIsShowLoader(false)
    }


    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isShowLoader}/>
            <Stack>
                <BaseUserFormProvider form={form}>
                    <BaseUserFormFields roles={roles}/>

                    <Group position="right" mt="md">
                        <Button type="submit">{dictionary.form.buttons.confirm}</Button>
                    </Group>
                </BaseUserFormProvider>
            </Stack>
        </Box>
    )
}

