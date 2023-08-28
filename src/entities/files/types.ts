export enum FileInfoType {
    FILE = 'FILE',
    DIR = 'DIR'
}

export interface FileInfo {
    name: string
    type: FileInfoType.FILE
    path: string
    extension: string
    url: string
}

export interface DirInfo {
    name: string
    type: FileInfoType.DIR
    path: string
}

export type FileItemInfo = FileInfo | DirInfo

