import {useState} from "react";
import {Input, TextInput, TransferList, TransferListData, TransferListItem} from "@mantine/core";
import {createFormContext, isNotEmpty} from "@mantine/form";
import {BaseRoleDto} from "@/entities/role";
import {Permission} from "@/entities/permission";
import {getBaseRoleFormDictionary} from "./i18n";

const dictionary = getBaseRoleFormDictionary('ru')

export const [BaseRoleFormProvider, useBaseRoleFormContext, useBaseRoleForm] = createFormContext<Omit<BaseRoleDto, 'permissionIds'> & {
    permissionIds: string[]
}>()

export const baseRoleFormFieldsValidate = {
    name: isNotEmpty(dictionary.form.errors.required)
}

interface BaseRoleFormFieldsProps {
    permissions: Permission[]
}

const createTransferListInitialValue = (permissions: Permission[], form: ReturnType<typeof useBaseRoleForm>): TransferListData => {
    const selectedValues: TransferListItem[] = []
    const unselectedValues: TransferListItem[] = []

    permissions.forEach((permission) => {
        const formPermission = form.values.permissionIds.find((id) => id === permission.id.toString())
        const transferListValue = {
            value: permission.id.toString(),
            label: permission.name
        }
        if (formPermission) {
            selectedValues.push(transferListValue)
        } else {
            unselectedValues.push(transferListValue)
        }
    })

    return [unselectedValues, selectedValues]
}

export const BaseRoleFormFields = ({permissions}: BaseRoleFormFieldsProps) => {
    const form = useBaseRoleFormContext()
    const transferListInitial = createTransferListInitialValue(permissions, form)

    const [data, setData] = useState<TransferListData>(transferListInitial);
    const handleChangeTransferList = ([original, selected]: [TransferListItem[], TransferListItem[]]) => {
        form.setFieldValue('permissionIds', selected.map(item => item.value))
        setData([original, selected])
    }
    return (
        <>
            <Input.Wrapper label={dictionary.form.fields.name}>
                <TextInput {...form.getInputProps('name')}/>
            </Input.Wrapper>

            <TransferList
                styles={{
                    transferListTitle: {
                        fontSize: '0.875rem'
                    }
                }}
                value={data}
                onChange={handleChangeTransferList}
                searchPlaceholder={dictionary.form.fields.permissions.searchField}
                nothingFound={dictionary.form.fields.permissions.notFound}
                titles={[dictionary.form.fields.permissions.title, dictionary.form.fields.permissions.selectedTitle]}
                listHeight={220}
            />

        </>
    )
}