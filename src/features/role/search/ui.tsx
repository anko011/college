import {Box, Button, Flex, Input, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {getRoleDictionary} from "@/entities/role/i18n";
import {useQuerySearchRoles} from "@/features/role/search/model";


const commonDictionary = getCommonDictionary('ru')
const roleDictionary = getRoleDictionary('ru')

export const SearchRoleForm = () => {
    const rolesQuerySearcher = useQuerySearchRoles()
    const form = useForm({
        initialValues: {
            name: ''
        },
    })

    const handleSubmit = (values: typeof form.values) => {
        rolesQuerySearcher.byName(values.name)
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

