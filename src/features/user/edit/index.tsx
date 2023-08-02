import {ActionIcon, Box, Button, Group} from "@mantine/core";
import {modals} from "@mantine/modals";
import {IconPencil} from "@tabler/icons-react";
import {fetchUpdateUser, UpdateUserDto, UserWithRole} from "@/entities/user";
import {Role} from "@/entities/role";
import {
    BaseUserFormFields,
    baseUserFormFieldsValidate,
    BaseUserFormProvider,
    useBaseUserForm
} from "@/entities/user/client";
import {useNotification} from "@/share/client/hooks";

import {getUserEditFeatureDictionary} from "./i18n";
import {mapToUpdateUserDto} from "./lib";

interface UserProps {
    user: UserWithRole
    roles: Role[]
}

type EditUserFormProps = UpdateUserDto & {
    roles: Role[]
}


const dictionary = getUserEditFeatureDictionary('ru')

export const EditUserForm = (
    {
        id,
        login,
        roleId,
        secondName,
        firstName,
        patronymic,
        password,
        roles
    }: EditUserFormProps) => {

    const notification = useNotification(dictionary.notification.title)
    const form = useBaseUserForm({
        initialValues: {
            firstName: firstName,
            secondName: secondName,
            patronymic: patronymic,
            roleId: roleId.toString(),
            login: login,
            password: password,
        },
        validate: baseUserFormFieldsValidate
    })

    const handleSubmit = async (values: typeof form.values) => {
        const response = await fetchUpdateUser(mapToUpdateUserDto(id, values))
        const data = await response.json()

        const errorMessage = 'message' in data
            ? data.message
            : dictionary.notification.error

        notification.byResponseNotify(response, dictionary.notification.success, errorMessage)
        form.reset()
    }

    return (
        <Box component="form" {...form.onSubmit(handleSubmit)}>
            <BaseUserFormProvider form={form}>
                <BaseUserFormFields roles={roles}/>

                <Group position="right" mt="md">
                    <Button
                        variant="default"
                        onClick={() => modals.closeAll()}
                    >
                        {dictionary.form.buttons.cancel}
                    </Button>
                    <Button type="submit">{dictionary.form.buttons.confirm}</Button>
                </Group>
            </BaseUserFormProvider>
        </Box>
    )
}

export function EditUserButton({user, roles}: UserProps) {

    const handleClick = () => {
        modals.open({
            title: dictionary.modal.title,
            centered: true,
            children: <EditUserForm
                id={user.id}
                firstName={user.firstName}
                secondName={user.secondName}
                patronymic={user.patronymic}
                login={user.login}
                password={user.password}
                roleId={user.role.id}
                roles={roles}
            />
        })
    }

    return (
        <ActionIcon color="blue" onClick={handleClick}>
            <IconPencil/>
        </ActionIcon>
    )
}