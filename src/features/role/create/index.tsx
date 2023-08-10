import {useState} from "react";
import {Box, Button, Group, Input, LoadingOverlay, Stack, TextInput} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {fetchCreateRole} from "@/entities/role";
import {PermissionsTransferList} from "@/entities/permission/client";
import {getCommonDictionary} from "@/share/lib/i18nService";
import {useNotification} from "@/share/client/hooks";
import {getCreateRoleDictionary} from "./i18n";
import {mapToCreateRoleDto} from "./lib";
import {getRoleDictionary} from "@/entities/role/i18n";

export type CreateRoleForm = {
    name: string,
    permissionIds: string[]
}

const commonDictionary = getCommonDictionary('ru')
const roleDictionary = getRoleDictionary('ru')
const createRoleDictionary = getCreateRoleDictionary('ru')

export function RoleCreateForm() {
    const [isShowLoader, setIsShowLoader] = useState(false)
    const notification = useNotification(createRoleDictionary.notification.title)

    const form = useForm<CreateRoleForm>({
        initialValues: {
            name: '',
            permissionIds: [],
        },
        validate: {
            name: isNotEmpty(commonDictionary.errors.required)
        }
    })

    const handleChangePermissions = (permissionIds: string[]) => {
        form.setFieldValue('permissionIds', permissionIds)
    }

    const handleSubmit = async (values: typeof form.values) => {
        setIsShowLoader(true)

        await notification.handlerError(async () => {
            await fetchCreateRole(mapToCreateRoleDto(values))
        }, createRoleDictionary.notification.success, createRoleDictionary.notification.error)

        setIsShowLoader(false)

        form.reset()
    }

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isShowLoader}/>

            <Stack>
                <Input.Wrapper label={roleDictionary.role.name}>
                    <TextInput {...form.getInputProps('name')}/>
                </Input.Wrapper>

                <PermissionsTransferList
                    selectedPermissionIds={form.values.permissionIds}
                    onChangePermissions={handleChangePermissions}
                />

                <Group position="right" mt="md">
                    <Button type="submit">{commonDictionary.buttons.create}</Button>
                </Group>
            </Stack>
        </Box>
    )
}

