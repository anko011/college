import {Box, Button, Group, Input, Select, SelectItem, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {Role} from "@/entities/role";
import {useNotification} from "@/share/client/hooks";
import {getUserCreateFeatureDictionary} from "./i18n";
import {fetchCreateUser, UserWithRole} from "@/entities/user";
import {isUserWithRole} from "@/entities/user/lib";

interface UserCreateFormProps {
    roles: Role[]

    onCreateUser?(user: UserWithRole): void
}

const dictionary = getUserCreateFeatureDictionary('ru')

export function UserCreateForm({roles, onCreateUser}: UserCreateFormProps) {
    const notification = useNotification(dictionary.notification.title)
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
        const data = await response.json()

        const message = 'message' in data
            ? data.message
            : dictionary.notification.error

        if (response.ok && isUserWithRole(data)) {
            notification.successNotify(dictionary.notification.success)
            onCreateUser?.(data)
        } else {
            notification.errorNotify(message)
        }

        form.reset()
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

