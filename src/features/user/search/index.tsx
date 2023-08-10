import {Box, Button, Flex, Input, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useAppRouter} from "@/share/client/hooks";
import {getUserDictionary, SearchUserDto} from "@/entities/user";
import {getCommonDictionary} from "@/share/lib/i18nService";

const commonDictionary = getCommonDictionary('ru')
const userDictionary = getUserDictionary('ru')

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

    const handleSubmit = async (values: typeof form.values) => {
        await router.updateQueries({...values})
    }

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Flex gap="md">

                <Input.Wrapper w="100%">
                    <TextInput placeholder={userDictionary.user.login} {...form.getInputProps('login')}/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder={userDictionary.user.firstName} {...form.getInputProps('firstName')}/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder={userDictionary.user.secondName} {...form.getInputProps('secondName')}/>
                </Input.Wrapper>

                <Input.Wrapper w="100%">
                    <TextInput placeholder={userDictionary.user.patronymic} {...form.getInputProps('patronymic')}/>
                </Input.Wrapper>

                <Button type="submit">{commonDictionary.buttons.search}</Button>
            </Flex>
        </Box>
    )
}

