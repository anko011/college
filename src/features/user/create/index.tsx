import {Box, Button, Group, Input, Select, SelectItem, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {Role} from "@/entities/role";
import {useHTTPNotification} from "@/share/client/hooks";
import {getUserCreateFeatureDictionary} from "./i18n";
import {fetchCreateUser} from "@/entities/user";

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

    const handleSubmit = async (values: typeof form.values) => {
        const response = await fetchCreateUser({...values, roleId: parseInt(values.roleId)})

        if ('message' in response) {
            const {message} = response
            notification.errorNotify(message)
        }
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