import {createFormContext, isNotEmpty} from "@mantine/form";
import {BaseUserDto} from "@/entities/user";
import {Input, Select, SelectItem, TextInput} from "@mantine/core";
import {getBaseUserFormDictionary} from "@/entities/user/client/ui/base-form/i18n";
import {Role} from "@/entities/role";

const dictionary = getBaseUserFormDictionary('ru')

export const [BaseUserFormProvider, useBaseUserFormContext, useBaseUserForm] = createFormContext<Omit<BaseUserDto, 'roleId'> & {
    roleId: string
}>()

export const baseUserFormFieldsValidate = {
    firstName: isNotEmpty(dictionary.form.errors.required),
    secondName: isNotEmpty(dictionary.form.errors.required),
    patronymic: isNotEmpty(dictionary.form.errors.required),
    login: isNotEmpty(dictionary.form.errors.required),
    password: isNotEmpty(dictionary.form.errors.required),
    roleId: isNotEmpty(dictionary.form.errors.required)
}

interface BaseUserFormFields {
    roles: Role[]
}

export const BaseUserFormFields = ({roles}: BaseUserFormFields) => {
    const form = useBaseUserFormContext()
    const selectValues: SelectItem[] = roles.map(role => ({label: role.name, value: role.id.toString()}))

    return (
        <>
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
        </>
    )
}