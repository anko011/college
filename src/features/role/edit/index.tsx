import {ActionIcon, Box, Button, Group, Input, LoadingOverlay, TextInput} from "@mantine/core";
import {modals} from "@mantine/modals";
import {IconPencil} from "@tabler/icons-react";
import {fetchUpdateRole, RoleWithPermissions} from "@/entities/role";
import {useAppRouter, useNotification} from "@/share/client/hooks";
import {getRoleEditDictionary} from "./i18n";
import {mapToUpdateRoleDto} from "./lib";
import {isNotEmpty, useForm} from "@mantine/form";
import React, {useState} from "react";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {PermissionContext, PermissionsTransferList, usePermissions} from "@/entities/permission/client";
import {getRoleDictionary} from "@/entities/role/i18n";

export interface EditRoleForm {
    name: string
    permissionIds: string[]
}

type EditUserFormProps = {
    role: RoleWithPermissions
}

interface EditRoleButtonProps {
    role: RoleWithPermissions
}

const commonDictionary = getCommonDictionary('ru')
const roleDictionary = getRoleDictionary('ru')
const roleEditDictionary = getRoleEditDictionary('ru')


export const EditRoleForm = ({role}: EditUserFormProps) => {
    const [isShowLoader, setIsShowLoader] = useState(false)
    const notification = useNotification(roleEditDictionary.notification.title)
    const router = useAppRouter()
    const form = useForm<EditRoleForm>({
        initialValues: {
            name: role.name,
            permissionIds: role.permissions.map(permission => permission.id.toString())
        },
        validate: {
            name: isNotEmpty(commonDictionary.errors.required)
        }
    })

    const handleChangePermissions = (selectedPermissionIds: string[]) => {
        console.log(selectedPermissionIds)
        form.setFieldValue('permissionIds', selectedPermissionIds)
    }

    const handleSubmit = async (values: typeof form.values) => {
        setIsShowLoader(true)

        await notification.handlerError(async () => {
            const updatedRole = await fetchUpdateRole(mapToUpdateRoleDto(role.id, values))
            form.setValues({
                name: updatedRole.name,
                permissionIds: updatedRole.permissions.map((permission) => permission.id.toString())
            })
            await router.safeReload()
        }, roleEditDictionary.notification.success, roleEditDictionary.notification.error)

        setIsShowLoader(false)

    }


    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isShowLoader}/>

            <Input.Wrapper label={roleDictionary.role.name}>
                <TextInput {...form.getInputProps('name')}/>
            </Input.Wrapper>

            <PermissionsTransferList
                selectedPermissionIds={form.values.permissionIds}
                onChangePermissions={handleChangePermissions}
            />

            <Group position="right" mt="md">
                <Button
                    variant="default"
                    onClick={() => modals.closeAll()}
                >
                    {commonDictionary.buttons.cancel}
                </Button>
                <Button type="submit">{commonDictionary.buttons.edit}</Button>
            </Group>
        </Box>
    )
}

export function EditRoleButton({role}: EditRoleButtonProps) {
    const permissions = usePermissions()

    const handleClick = () => {
        modals.open({
            title: roleEditDictionary.modal.title,
            centered: true,
            children:
                <PermissionContext.Provider value={permissions}>
                    <EditRoleForm role={role}/>
                </PermissionContext.Provider>
        })
    }

    return (
        <ActionIcon color="blue" onClick={handleClick}>
            <IconPencil/>
        </ActionIcon>
    )
}