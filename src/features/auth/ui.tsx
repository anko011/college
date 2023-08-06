import {Button, Input, LoadingOverlay, Paper, PasswordInput, Stack, TextInput} from "@mantine/core";
import {useNotification} from "@/share/client/hooks";
import {useState} from "react";
import {useRouter} from "next/router";
import {isNotEmpty, useForm} from "@mantine/form";
import {signIn} from "@/features/auth/api";
import {getBaseDictionary} from "@/share/lib/i18nService";

const dictionary = getBaseDictionary('ru')

const REDIRECT_TIME = 1000

const hasMessage = (data: any) => 'message' in data && typeof data.message === 'string'

export const AuthByCredentialForm = () => {
    const notification = useNotification('Авторизация')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            username: isNotEmpty(dictionary.form.errors.required),
            password: isNotEmpty(dictionary.form.errors.required),
        }
    })


    const handleSubmit = async (values: typeof form.values) => {
        setIsLoading(true)

        const response = await signIn(values.username, values.password)
        const data = await response.json()

        if (!hasMessage(data)) throw new Error('Ошибка авторизации')


        if (response.ok) {
            notification.successNotify(data.message)
            setTimeout(() => router.push('/admin'), REDIRECT_TIME)
        } else {
            notification.errorNotify(data.message)
            setIsLoading(false)
            form.reset()
        }
    }
    return (
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
    )
}
