import {Input, Select} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useRoles} from "@/entities/role/client/hooks";
import {getRoleDictionary} from "../../../i18n";

export type RoleSelectSupportedForm = ReturnType<typeof useForm<{
    roleId: string
}>>

interface RoleSelectProps {
    form: RoleSelectSupportedForm
}

const roleDictionary = getRoleDictionary('ru')

export const RoleSelect = ({form}: RoleSelectProps) => {
    const roles = useRoles()
    const selectValues = roles.map(role => role.id.toString())

    return (
        <Input.Wrapper label={roleDictionary.title}>
            <Select
                {...form.getInputProps('roleId')}
                data={selectValues}
                onChange={(value) => form.setFieldValue('roleId', value ?? '')}
            />
        </Input.Wrapper>
    )
}