import {useRouter} from "next/router";
import {FormEvent, ReactNode, useState} from "react";
import {Button, Flex, Input, LoadingOverlay, Paper, PasswordInput, Stack, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {Notifications} from "@mantine/notifications";
import {signIn} from "@/features/auth";
import {useHTTPNotification} from "../../../share/client/hooks";

export default function AdminLoginPage() {
    const notification = useHTTPNotification('Авторизация')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            username: isNotEmpty('Поле не должно быть пустым'),
            password: isNotEmpty('Поле не должно быть пустым'),
        }
    })


    const handleSubmit = async (values: typeof form.values, e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const response = await signIn(values.username, values.password)
        const {message} = await response.json()

        notification.byStatusNotify(response.ok, 'Вы успешно авторизовались', message)
        setIsLoading(false)

        if (response.ok) {
            await router.push('/admin')
        }
    }

    return (
        <>
            <Notifications autoClose={3000}/>
            <Paper
                component="form"
                onSubmit={form.onSubmit(handleSubmit)}
                shadow="md"
                p="lg"
                withBorder
                miw="250px"
            >
                <LoadingOverlay visible={isLoading}/>
                <Stack>
                    <Input.Wrapper label="Логин" required>
                        <TextInput name="username" {...form.getInputProps('username')}/>
                    </Input.Wrapper>

                    <Input.Wrapper label="Пароль" required>
                        <PasswordInput name="password" {...form.getInputProps('password')}/>
                    </Input.Wrapper>

                    <Button type="submit">Войти</Button>
                </Stack>
            </Paper>
        </>
    )
}

AdminLoginPage.getLayout = function (page: ReactNode) {
    return (
        <Flex
            justify="center"
            align="center"
            sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }}>
            {page}
        </Flex>
    )
}
