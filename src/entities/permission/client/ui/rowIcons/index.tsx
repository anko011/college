import {Tooltip} from "@mantine/core";
import {IconAddressBookOff, IconFileDownload, IconFileReport, IconFileUpload} from "@tabler/icons-react";
import {Permission, PermissionSystemName} from "../../../types";

interface PermissionRowIconsProps {
    permissions: Permission[]
}


//TODO: logout


export const PermissionRowIcons = ({permissions}: PermissionRowIconsProps) => {
    if (!permissions.length) return null


    return (
        <>
            {permissions.sort((a, b) => a.id - b.id).map(permission => {
                switch (permission.systemName) {
                    case PermissionSystemName.UPLOAD_FILE_PERMISSION:
                        return (
                            <Tooltip key={permission.id} label={permission.name}>
                                <IconFileUpload/>
                            </Tooltip>
                        )
                    case PermissionSystemName.DOWNLOAD_FILE_PERMISSION:
                        return (
                            <Tooltip key={permission.id} label={permission.name}>
                                <IconFileDownload/>
                            </Tooltip>
                        )
                    case PermissionSystemName.WATCH_FILE_PERMISSION:
                        return (
                            <Tooltip key={permission.id} label={permission.name}>
                                <IconFileReport/>
                            </Tooltip>
                        )
                    case PermissionSystemName.DELETE_FILE_PERMISSION:
                        return (
                            <Tooltip key={permission.id} label={permission.name}>
                                <IconAddressBookOff/>
                            </Tooltip>
                        )
                }
            })}
        </>
    )
}