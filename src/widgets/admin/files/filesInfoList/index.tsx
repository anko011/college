import {FileInfo} from "@/entities/files";
import {FileInfoRow} from "@/entities/files/client/admin";
import {DeleteFileButton, DownloadFileButton, OpenFileLink, UploadToYandexButton} from "@/features/file";
import {Group} from "@mantine/core";

interface FilesInfoListProps {
    files: FileInfo[]
}

export const FilesInfoList = ({files}: FilesInfoListProps) => {
    return (
        <>
            {files.map((file) => (
                <FileInfoRow
                    key={`${file.path}/${file.name}`}
                    file={file}
                    label={<OpenFileLink name={file.name} url={file.displayUrl}/>}
                    before={(
                        <Group>
                            <UploadToYandexButton file={file}/>
                            <DownloadFileButton url={file.downloadUrl}/>
                            <DeleteFileButton name={file.name} path={`${file.path}${file.name}`}/>
                        </Group>
                    )}
                />
            ))}
        </>
    )
}

