import {TransferList, TransferListData, TransferListItem} from "@mantine/core";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {usePermissions} from "../../hooks";
import {Permission} from "../../../types";
import {getPermissionDictionary} from "../../../i18n";


interface PermissionsTransferListProps {
    selectedPermissionIds: string[]

    onChangePermissions?(permissionIds: string[]): void
}

const commonDictionary = getCommonDictionary('ru')
const permissionDictionary = getPermissionDictionary('ru')
const createTransferListInitialValue = (permissions: Permission[], selectedIds: string[]): TransferListData => {
    const selectedValues: TransferListItem[] = []
    const unselectedValues: TransferListItem[] = []

    permissions.forEach((permission) => {
        const formPermission = selectedIds.find((id) => id === permission.id.toString())
        const transferListValue = {
            value: permission.id.toString(),
            label: permission.russianName
        }
        if (formPermission) {
            selectedValues.push(transferListValue)
        } else {
            unselectedValues.push(transferListValue)
        }
    })

    return [unselectedValues, selectedValues]
}

export const PermissionsTransferList = (
    {
        selectedPermissionIds = [],
        onChangePermissions
    }: PermissionsTransferListProps) => {
    const permissions = usePermissions()
    const data = createTransferListInitialValue(permissions, selectedPermissionIds)

    const handleChangeTransferList = ([_, selected]: [TransferListItem[], TransferListItem[]]) => {
        onChangePermissions?.(selected.map((permission) => permission.value.toString()))
    }

    return (
        <TransferList
            styles={{
                transferListTitle: {
                    fontSize: '0.875rem'
                }
            }}
            value={data}
            onChange={handleChangeTransferList}
            searchPlaceholder={commonDictionary.fields.search}
            nothingFound={commonDictionary.fields.notFound}
            titles={[permissionDictionary.form.transferList.unselectedValues, permissionDictionary.form.transferList.selectedValues]}
            listHeight={220}
        />
    )
}