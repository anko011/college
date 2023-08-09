import {Box, Button, Group, LoadingOverlay, Stack} from "@mantine/core";
import {Permission} from "@/entities/permission";
import {BaseRoleFormFields, BaseRoleFormProvider, useBaseRoleForm} from "@/entities/role/client";
import {useNotification} from "@/share/client/hooks";
import {getRoleCreateFeatureDictionary} from "./i18n";
import {useState} from "react";
import {isNotEmpty} from "@mantine/form";
import {mapToCreateRoleDto} from "@/features/role/create/lib";
import {fetchCreateRole} from "@/entities/role";

interface RoleCreateFormProps {
    permissions: Permission[]
}

const dictionary = getRoleCreateFeatureDictionary('ru')

export function RoleCreateForm({permissions}: RoleCreateFormProps) {
    const notification = useNotification(dictionary.notification.title)
    const [isShowLoader, setIsShowLoader] = useState(false)
    const form = useBaseRoleForm({
        initialValues: {
            name: '',
            permissionIds: []
        },
        validate: {
            name: isNotEmpty(dictionary.form.errors.required)
        }
    })

    const handleSubmit = async (values: typeof form.values) => {

        setIsShowLoader(true)
        await notification.handlerError(async () => {
            await fetchCreateRole(mapToCreateRoleDto(values))
        }, dictionary.notification.success, dictionary.notification.error)
        setIsShowLoader(false)

        form.reset()
    }

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isShowLoader}/>
            <Stack>
                <BaseRoleFormProvider form={form}>
                    <BaseRoleFormFields permissions={permissions}/>

                    <Group position="right" mt="md">
                        <Button type="submit">{dictionary.form.buttons.confirm}</Button>
                    </Group>
                </BaseRoleFormProvider>
            </Stack>
        </Box>
    )
}

