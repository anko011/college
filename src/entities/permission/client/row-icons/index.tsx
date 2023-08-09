import {IconAddressBookOff, IconFileDownload, IconFileReport, IconFileUpload} from "@tabler/icons-react";
import {Tooltip} from "@mantine/core";

interface PermissionRowIconsProps {
    permissionsIds: number[]
}

//TODO: will realise naming tooltips from API

export const PermissionRowIcons = ({permissionsIds}: PermissionRowIconsProps) => {
    if (!permissionsIds.length) return null

    return (
        <>
            {permissionsIds.sort((a, b) => a - b).map(permission => {
                switch (permission) {
                    case 204:
                        return (
                            <Tooltip label="Загрузка файлов">
                                <IconFileUpload/>
                            </Tooltip>
                        )
                    case 205:
                        return (
                            <Tooltip label="Скачивание файлов">
                                <IconFileDownload/>
                            </Tooltip>
                        )
                    case 206:
                        return (
                            <Tooltip label="Просмотр файлов">
                                <IconFileReport/>
                            </Tooltip>
                        )
                    case 207:
                        return (
                            <Tooltip label="Удаление файлов">
                                <IconAddressBookOff/>
                            </Tooltip>
                        )
                }
            })}
        </>
    )
}