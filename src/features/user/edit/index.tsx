import {ActionIcon, Box, Button, Group, Input, LoadingOverlay, Stack, TextInput} from "@mantine/core";
import {useState} from "react";
import {isNotEmpty, useForm} from "@mantine/form";
import {modals} from "@mantine/modals";
import {IconPencil} from "@tabler/icons-react";
import {fetchUpdateUser, getUserDictionary, UserWithRole} from "@/entities/user";
import {RolesContext, RoleSelect, useRoles} from "@/entities/role/client";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {useAppRouter, useNotification} from "@/share/client/hooks";
import {getUserEditDictionary} from "./i18n";
import {mapToUpdateUserDto} from "./lib";

interface UserProps {
    user: UserWithRole
}

interface EditUserFormProps {
    user: UserWithRole
}

export interface EditUserForm {
    firstName: string
    secondName: string
    patronymic: string
    login: string
    password: string
    roleId: string
}

const commonDictionary = getCommonDictionary('ru')
const userDictionary = getUserDictionary('ru')
const dictionary = getUserEditDictionary('ru')

export const EditUserForm = ({user}: EditUserFormProps) => {
    const router = useAppRouter()
    const notification = useNotification(dictionary.notification.title)
    const [isShowLoader, setIsShowLoader] = useState(false)
    const form = useForm<EditUserForm>({
        initialValues: {
            firstName: user.firstName,
            secondName: user.secondName,
            patronymic: user.patronymic,
            roleId: user.role.id.toString(),
            login: user.login,
            password: '',
        },
        validate: {
            firstName: isNotEmpty(commonDictionary.errors.required),
            secondName: isNotEmpty(commonDictionary.errors.required),
            patronymic: isNotEmpty(commonDictionary.errors.required),
            login: isNotEmpty(commonDictionary.errors.required),
            roleId: isNotEmpty(commonDictionary.errors.required)
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        setIsShowLoader(true)
        await notification.handlerError(async () => {
            const updatedUser = await fetchUpdateUser(mapToUpdateUserDto(user.id, values))
            form.setValues({...updatedUser, password: undefined})
        }, dictionary.notification.success, dictionary.notification.error)
        setIsShowLoader(false)
        await router.safeReload()
    }

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isShowLoader}/>
            <Stack>
                <Input.Wrapper label={userDictionary.user.firstName}>
                    <TextInput {...form.getInputProps('firstName')}/>
                </Input.Wrapper>

                <Input.Wrapper label={userDictionary.user.secondName}>
                    <TextInput {...form.getInputProps('secondName')}/>
                </Input.Wrapper>

                <Input.Wrapper label={userDictionary.user.patronymic}>
                    <TextInput {...form.getInputProps('patronymic')}/>
                </Input.Wrapper>

                <RoleSelect {...form.getInputProps('roleId')}/>

                <Input.Wrapper label={userDictionary.user.login}>
                    <TextInput {...form.getInputProps('login')}/>
                </Input.Wrapper>

                <Input.Wrapper label={userDictionary.user.password}>
                    <TextInput {...form.getInputProps('password')}/>
                </Input.Wrapper>


                <Group position="right" mt="md">
                    <Button type="submit">{commonDictionary.buttons.edit}</Button>
                </Group>
            </Stack>
        </Box>
    )
}


export function EditUserButton({user}: UserProps) {
    const roles = useRoles()

    const handleClick = () => {
        modals.open({
            title: dictionary.modal.title,
            centered: true,
            children: (
                <RolesContext.Provider value={roles}>
                    <EditUserForm user={user}/>
                </RolesContext.Provider>
            )
        })
    }

    return (
        <ActionIcon color="blue" onClick={handleClick}>
            <IconPencil/>
        </ActionIcon>
    )
}