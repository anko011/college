import {ActionIcon, Box, Button, Group, LoadingOverlay, Stack} from "@mantine/core";
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
import {useAppRouter, useNotification} from "@/share/client/hooks";
import {getUserEditFeatureDictionary} from "./i18n";
import {mapToUpdateUserDto} from "./lib";
import {useState} from "react";

interface UserProps {
    user: UserWithRole
    roles: Role[]
}

type EditUserFormProps = Omit<UpdateUserDto, 'password'> & {
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
        roles
    }: EditUserFormProps) => {

    const router = useAppRouter()
    const notification = useNotification(dictionary.notification.title)
    const [isShowLoader, setIsShowLoader] = useState(false)
    const form = useBaseUserForm({
        initialValues: {
            firstName: firstName,
            secondName: secondName,
            patronymic: patronymic,
            roleId: roleId.toString(),
            login: login,
            password: '',
        },
        validate: {
            ...baseUserFormFieldsValidate,
            password: undefined
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        setIsShowLoader(true)
        await notification.handlerError(async () => {
            const user = await fetchUpdateUser(mapToUpdateUserDto(id, values))
            form.setValues({
                firstName: user.firstName,
                secondName: user.secondName,
                patronymic: user.patronymic,
                roleId: user.role.id.toString(),
                login: user.login,
                password: ''
            })
        }, dictionary.notification.success, dictionary.notification.error)
        setIsShowLoader(false)
        await router.safeReload()
    }

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isShowLoader}/>
            <Stack>
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
            </Stack>
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