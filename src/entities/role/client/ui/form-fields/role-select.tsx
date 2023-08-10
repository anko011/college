import {forwardRef} from "react";
import {Input, Select} from "@mantine/core";
import {GetInputProps} from "@/share/client/types";
import {useRoles} from "../../hooks";
import {getRoleDictionary} from "../../../i18n";


type RoleSelectProps = GetInputProps

const roleDictionary = getRoleDictionary('ru')

const Component = forwardRef<HTMLInputElement, RoleSelectProps>((props, ref) => {
    const roles = useRoles()
    const selectValues = roles.map(role => ({
        value: role.id.toString(),
        label: role.name
    }))

    return (
        <Input.Wrapper label={roleDictionary.title}>
            <Select {...props} ref={ref} data={selectValues} searchable/>
        </Input.Wrapper>
    )
})

Component.displayName = 'RoleSelect'
export const RoleSelect = Component

