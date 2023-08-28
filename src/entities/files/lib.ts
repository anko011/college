import {DirInfo, FileInfo, FileItemInfo} from "./types";

export const isFileInfo = (obj: unknown): obj is FileInfo => (
    typeof obj === 'object' && !!obj &&
    'name' in obj && typeof obj.name === 'string' &&
    'type' in obj && typeof obj.type === 'string' && obj.type === 'FILE' &&
    'path' in obj && typeof obj.path === 'string' &&
    'extension' in obj && typeof obj.extension === 'string' &&
    'url' in obj && typeof obj.url === 'string'
)

export const isDirInfo = (obj: unknown): obj is DirInfo => (
    typeof obj === 'object' && !!obj &&
    'name' in obj && typeof obj.name === 'string' &&
    'type' in obj && typeof obj.type === 'string' && obj.type === 'DIR' &&
    'path' in obj && typeof obj.path === 'string'
)

export const isFileItemInfo = (obj: unknown): obj is FileItemInfo => (isFileInfo(obj) || isDirInfo(obj))