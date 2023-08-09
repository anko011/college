import {Box, Button, Flex, Input, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useAppRouter} from "@/share/client/hooks";
import {SearchUserDto} from "@/entities/user";


export const UserSearchForm = () => {
    const router = useAppRouter()
    const form = useForm<SearchUserDto>({
        initialValues: {
            login: '',
            firstName: '',
            secondName: '',
            patronymic: ''
        },
    })

    const handleSubmit = (values: typeof form.values) => {
        router.updateQueries({...values})
    }

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Flex gap="md">

                <Input.Wrapper w="100%">
                    <TextInput placeholder="Логин" {...form.getInputProps('login')}/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder="Имя" {...form.getInputProps('firstName')}/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder="Фамилия" {...form.getInputProps('secondName')}/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder="Отчество" {...form.getInputProps('patronymic')}/>
                </Input.Wrapper>

                <Button type="submit">Поиск</Button>
            </Flex>
        </Box>
    )
}

