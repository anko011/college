import {ActionIcon, Box, Button, Group, Input, Select, SelectItem, TextInput} from "@mantine/core";
import {modals} from "@mantine/modals";
import {isNotEmpty, useForm} from "@mantine/form";
import {IconPencil} from "@tabler/icons-react";
import {UserWithRole} from "@/entities/user";
import {Role} from "@/entities/role";
import {useNotification} from "@/share/client/hooks";
import {getUserEditFeatureDictionary} from "./i18n";

interface UserProps {
    user: UserWithRole
    roles: Role[]
}

const dictionary = getUserEditFeatureDictionary('ru')


export function EditUserButton({user, roles}: UserProps) {
    const notification = useNotification(dictionary.notification.title)
    const form = useForm({
        initialValues: {
            firstName: user.firstName,
            secondName: user.secondName,
            patronymic: user.patronymic,
            roleId: user.role.id.toString(),
            login: user.login
        },
        validate: {
            firstName: isNotEmpty(dictionary.form.errors.required),
            secondName: isNotEmpty(dictionary.form.errors.required),
            patronymic: isNotEmpty(dictionary.form.errors.required),
            roleId: isNotEmpty(dictionary.form.errors.required),
            login: isNotEmpty(dictionary.form.errors.required),
        }
    })

    const handleSubmit = (values: typeof form.values) => {

    }

    const selectValues: SelectItem[] = roles.map(role => ({label: role.name, value: role.id.toString()}))

    const handleClick = () => {
        modals.open({
            title: dictionary.modal.title,
            children: (
                <Box component="form" {...form.onSubmit(handleSubmit)}>
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
                        <Button
                            variant="default"
                            onClick={() => modals.closeAll()}
                        >
                            {dictionary.form.buttons.cancel}
                        </Button>
                        <Button type="submit">{dictionary.form.buttons.confirm}</Button>
                    </Group>
                </Box>
            ),
            centered: true,
        })
    }

    return (
        <ActionIcon color="blue" onClick={handleClick}>
            <IconPencil/>
        </ActionIcon>
    )
}