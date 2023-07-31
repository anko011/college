import {Box, Button, Group, Input, Select, SelectItem, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {getUserCreateFeatureDictionary} from "@/features/user/create/i18n";
import {Role} from "@/entities/role";
import {useHTTPNotification} from "@/share/client/hooks";

interface UserCreateFormProps {
    roles: Role[]
}

const dictionary = getUserCreateFeatureDictionary('ru')

export function UserCreateForm({roles}: UserCreateFormProps) {
    const notification = useHTTPNotification(dictionary.notification.title)
    const form = useForm({
        initialValues: {
            firstName: '',
            secondName: '',
            patronymic: '',
            login: '',
            password: '',
            roleId: ''
        },
        validate: {
            firstName: isNotEmpty(dictionary.form.errors.required),
            secondName: isNotEmpty(dictionary.form.errors.required),
            patronymic: isNotEmpty(dictionary.form.errors.required),
            login: isNotEmpty(dictionary.form.errors.required),
            password: isNotEmpty(dictionary.form.errors.required),
            roleId: isNotEmpty(dictionary.form.errors.required)
        }
    })

    const handleSubmit = (values: typeof form.values) => {

    }

    const selectValues: SelectItem[] = roles.map(role => ({label: role.name, value: role.id.toString()}))


    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Input.Wrapper label={dictionary.form.fields.firstName}>
                <TextInput {...form.getInputProps('firstName')}/>
            </Input.Wrapper>

            <Input.Wrapper label={dictionary.form.fields.secondName}>
                <TextInput {...form.getInputProps('secondName')}/>
            </Input.Wrapper>

            <Input.Wrapper label={dictionary.form.fields.patronymic}>
                <TextInput {...form.getInputProps('patronymic')}/>
            </Input.Wrapper>

            <Input.Wrapper label={dictionary.form.fields.role}>
                <Select
                    {...form.getInputProps('roleId')}
                    data={selectValues}
                    onChange={(value) => form.setFieldValue('roleId', value ?? '')}
                />
            </Input.Wrapper>

            <Input.Wrapper label={dictionary.form.fields.login}>
                <TextInput {...form.getInputProps('login')}/>
            </Input.Wrapper>

            <Input.Wrapper label={dictionary.form.fields.password}>
                <TextInput {...form.getInputProps('password')}/>
            </Input.Wrapper>

            <Group position="right" mt="md">
                <Button type="submit">{dictionary.form.buttons.confirm}</Button>
            </Group>
        </Box>
    )
}