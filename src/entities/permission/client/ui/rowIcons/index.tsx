import {Tooltip} from "@mantine/core";
import {IconAddressBookOff, IconFileDownload, IconFileReport, IconFileUpload} from "@tabler/icons-react";
import {Permission} from "../../../types";

interface PermissionRowIconsProps {
    permissions: Permission[]
}


export const PermissionRowIcons = ({permissions}: PermissionRowIconsProps) => {
    if (!permissions.length) return null


    return (
        <>
            {permissions.sort((a, b) => a.id - b.id).map(permission => {
                switch (permission.id) {
                    case 302:
                        return (
                            <Tooltip key={permission.id} label={permission.russianName}>
                                <IconFileUpload/>
                            </Tooltip>
                        )
                    case 303:
                        return (
                            <Tooltip key={permission.id} label={permission.russianName}>
                                <IconFileDownload/>
                            </Tooltip>
                        )
                    case 304:
                        return (
                            <Tooltip key={permission.id} label={permission.russianName}>
                                <IconFileReport/>
                            </Tooltip>
                        )
                    case 305:
                        return (
                            <Tooltip key={permission.id} label={permission.russianName}>
                                <IconAddressBookOff/>
                            </Tooltip>
                        )
                }
            })}
        </>
    )
}