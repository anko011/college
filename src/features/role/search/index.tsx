import {Box, Button, Flex, Input, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useAppRouter} from "@/share/client/hooks";
import {SearchRoleDto} from "@/entities/role";
import {getRoleSearchFeatureDictionary} from "./i18n";


const dictionary = getRoleSearchFeatureDictionary('ru')

export const SearchRoleForm = () => {
    const router = useAppRouter()
    const form = useForm<SearchRoleDto>({
        initialValues: {
            name: ''
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        await router.updateQueries({...values})
    }

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Flex gap="md">

                <Input.Wrapper w="100%">
                    <TextInput placeholder={dictionary.form.fields.search.name} {...form.getInputProps('name')}/>
                </Input.Wrapper>

                <Button type="submit">{dictionary.form.buttons.search}</Button>
            </Flex>
        </Box>
    )
}

