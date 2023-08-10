import {createFormContext, isNotEmpty} from "@mantine/form";
import {BaseUserDto} from "@/entities/user";
import {Input, TextInput} from "@mantine/core";
import {Role} from "@/entities/role";
import {getUserDictionary} from "@/entities/user/i18n";
import {getCommonDictionary} from "@/share/lib/i18nService";

const userDictionary = getUserDictionary('ru')
const commonDictionary = getCommonDictionary('ru')

export const [BaseUserFormProvider, useBaseUserFormContext, useBaseUserForm] = createFormContext<Omit<BaseUserDto, 'roleId'> & {
    roleId: string
}>()

export const baseUserFormFieldsValidate = {
    firstName: isNotEmpty(commonDictionary.errors.required),
    secondName: isNotEmpty(commonDictionary.errors.required),
    patronymic: isNotEmpty(commonDictionary.errors.required),
    login: isNotEmpty(commonDictionary.errors.required),
    password: isNotEmpty(commonDictionary.errors.required),
    roleId: isNotEmpty(commonDictionary.errors.required)
}

interface BaseUserFormFields {
    roles: Role[]
}

export const BaseUserFormFields = ({roles}: BaseUserFormFields) => {
    const form = useBaseUserFormContext()

    return (
        <>
            <Input.Wrapper label={userDictionary.user.firstName}>
                <TextInput {...form.getInputProps('firstName')}/>
            </Input.Wrapper>

            <Input.Wrapper label={userDictionary.user.secondName}>
                <TextInput {...form.getInputProps('secondName')}/>
            </Input.Wrapper>

            <Input.Wrapper label={userDictionary.user.patronymic}>
                <TextInput {...form.getInputProps('patronymic')}/>
            </Input.Wrapper>


            <Input.Wrapper label={userDictionary.user.login}>
                <TextInput {...form.getInputProps('login')}/>
            </Input.Wrapper>

            <Input.Wrapper label={userDictionary.user.password}>
                <TextInput {...form.getInputProps('password')}/>
            </Input.Wrapper>
        </>
    )
}