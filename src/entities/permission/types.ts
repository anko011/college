export enum PermissionSystemName {
    UPLOAD_FILE_PERMISSION = "UPLOAD_FILE_PERMISSION",
    DOWNLOAD_FILE_PERMISSION = "DOWNLOAD_FILE_PERMISSION",
    WATCH_FILE_PERMISSION = "WATCH_FILE_PERMISSION",
    DELETE_FILE_PERMISSION = "DELETE_FILE_PERMISSION",
    UPLOAD_TO_YANDEX_DISK = "UPLOAD_TO_YANDEX_DISK"
}

export interface Permission {
    id: number
    name: string
    systemName: PermissionSystemName
}
