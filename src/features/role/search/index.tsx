import {Box, Button, Flex, Input, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useAppRouter} from "@/share/client/hooks";
import {SearchRoleDto} from "@/entities/role";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {getRoleDictionary} from "@/entities/role/i18n";


const commonDictionary = getCommonDictionary('ru')
const roleDictionary = getRoleDictionary('ru')

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
                    <TextInput placeholder={roleDictionary.role.name} {...form.getInputProps('name')}/>
                </Input.Wrapper>

                <Button type="submit">{commonDictionary.buttons.search}</Button>
            </Flex>
        </Box>
    )
}

