import {ActionIcon, Box, Button, Group, LoadingOverlay} from "@mantine/core";
import {modals} from "@mantine/modals";
import {IconPencil} from "@tabler/icons-react";
import {fetchUpdateRole, RoleWithPermissions} from "@/entities/role";
import {useAppRouter, useNotification} from "@/share/client/hooks";

import {getRoleEditFeatureDictionary} from "./i18n";
import {mapToUpdateRoleDto} from "./lib";
import {BaseRoleFormFields, BaseRoleFormProvider, useBaseRoleForm} from "@/entities/role/client";
import {Permission} from "@/entities/permission";
import {isNotEmpty} from "@mantine/form";
import React, {useState} from "react";


type EditUserFormProps = {
    name: string
    roleId: number
    selectedPermissionIds: Permission[]
    permissions: Permission[]
}

interface EditRoleButtonProps {
    permissions: Permission[]
    role: RoleWithPermissions
}

const dictionary = getRoleEditFeatureDictionary('ru')

export const EditRoleForm = (
    {
        roleId,
        name,
        selectedPermissionIds,
        permissions,
    }: EditUserFormProps) => {

    const [isShowLoader, setIsShowLoader] = useState(false)
    const notification = useNotification(dictionary.notification.title)
    const router = useAppRouter()
    const form = useBaseRoleForm({
        initialValues: {
            name: name,
            permissionIds: selectedPermissionIds.map(permission => permission.id.toString())
        },
        validate: {
            name: isNotEmpty(dictionary.form.errors.required)
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        setIsShowLoader(true)
        await notification.handlerError(async () => {
            await fetchUpdateRole(mapToUpdateRoleDto(roleId, values))
        }, dictionary.notification.success, dictionary.notification.error)
        await router.safeReload()
        setIsShowLoader(false)
        form.reset()
    }

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isShowLoader}/>
            <BaseRoleFormProvider form={form}>
                <BaseRoleFormFields permissions={permissions}/>
                <Group position="right" mt="md">
                    <Button
                        variant="default"
                        onClick={() => modals.closeAll()}
                    >
                        {dictionary.form.buttons.cancel}
                    </Button>
                    <Button type="submit">{dictionary.form.buttons.confirm}</Button>
                </Group>
            </BaseRoleFormProvider>
        </Box>
    )
}

export function EditRoleButton({permissions, role}: EditRoleButtonProps) {

    const handleClick = () => {
        modals.open({
            title: dictionary.modal.title,
            centered: true,
            children: <EditRoleForm
                permissions={permissions}
                name={role.name}
                roleId={role.id}
                selectedPermissionIds={role.permissions}
            />
        })
    }

    return (
        <ActionIcon color="blue" onClick={handleClick}>
            <IconPencil/>
        </ActionIcon>
    )
}