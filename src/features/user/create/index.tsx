import {useState} from "react";
import {Box, Button, Group, Input, LoadingOverlay, Stack, TextInput} from "@mantine/core";
import {fetchCreateUser, getUserDictionary} from "@/entities/user";
import {RoleSelect} from "@/entities/role/client";
import {useNotification} from "@/share/client/hooks";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {getUserCreateDictionary} from "./i18n";
import {mapToCreateUserDto} from "./lib";
import {isNotEmpty, useForm} from "@mantine/form";

export interface CreateUserForm {
    firstName: string
    secondName: string
    patronymic: string
    login: string
    password: string
    roleId: string
}

const commonDictionary = getCommonDictionary('ru')
const userDictionary = getUserDictionary('ru')
const userCreateDictionary = getUserCreateDictionary('ru')

export function UserCreateForm() {
    const notification = useNotification(userCreateDictionary.notification.title)
    const [isShowLoader, setIsShowLoader] = useState(false)
    const form = useForm<CreateUserForm>({
        initialValues: {
            firstName: '',
            secondName: '',
            patronymic: '',
            login: '',
            password: '',
            roleId: ''
        },
        validate: {
            firstName: isNotEmpty(commonDictionary.errors.required),
            secondName: isNotEmpty(commonDictionary.errors.required),
            patronymic: isNotEmpty(commonDictionary.errors.required),
            login: isNotEmpty(commonDictionary.errors.required),
            password: isNotEmpty(commonDictionary.errors.required),
            roleId: isNotEmpty(commonDictionary.errors.required)
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        setIsShowLoader(true)
        await notification.handlerError(async () => {
            await fetchCreateUser(mapToCreateUserDto(values))
        }, userCreateDictionary.notification.success, userCreateDictionary.notification.error)
        form.reset()
        setIsShowLoader(false)
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
                    <Button type="submit">{commonDictionary.buttons.create}</Button>
                </Group>
            </Stack>
        </Box>
    )
}

