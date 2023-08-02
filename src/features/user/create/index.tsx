import {Box, Button, Group} from "@mantine/core";
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

interface UserCreateFormProps {
    roles: Role[]
}

const dictionary = getUserCreateFeatureDictionary('ru')

export function UserCreateForm({roles}: UserCreateFormProps) {
    const notification = useNotification(dictionary.notification.title)
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
        const response = await fetchCreateUser(mapToCreateUserDto(values))
        const data = await response.json()

        const errorMessage = 'message' in data
            ? data.message
            : dictionary.notification.error

        notification.byResponseNotify(response, dictionary.notification.success, errorMessage)
        form.reset()
    }


    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <BaseUserFormProvider form={form}>
                <BaseUserFormFields roles={roles}/>

                <Group position="right" mt="md">
                    <Button type="submit">{dictionary.form.buttons.confirm}</Button>
                </Group>
            </BaseUserFormProvider>
        </Box>
    )
}

