import {FileInfo} from "@/entities/files";
import {Box, Collapse, createStyles, Group} from "@mantine/core";
import {
    DeleteDirectoryButton,
    DeleteFileButton,
    DownloadFileButton,
    OpenDirectoryLink,
    OpenFileLink,
    UploadToYandexButton
} from "@/features/file";
import {useState} from "react";
import {DirInfoRow, FileInfoRow} from "@/entities/files/client/admin";

interface SearchedFilesInfoListProps {
    filesMap: { [key: string]: FileInfo[] }
}

interface SearchedFilesInfoItemProps {
    path: string
    files: FileInfo[]
}

const useStyles = createStyles((theme) => ({
    root: {},
    header: {
        cursor: 'pointer',
        background: theme.colors.blue[0]
    },
    content: {
        borderTop: '1px solid black',
        marginTop: '8px',
        paddingTop: '8px'
    }
}))

const SearchedFilesInfoItem = ({files, path}: SearchedFilesInfoItemProps) => {
    const [isShowCollapse, setIsShowCollapse] = useState(false)
    const {classes} = useStyles()
    const handleClick = () => {
        setIsShowCollapse((prev) => !prev)
    }

    const pathWithoutEndedSlash = path.endsWith('/') ? path.slice(0, path.length - 1) : path

    return (
        <>
            <Box onClick={handleClick} className={classes.header}>
                <DirInfoRow
                    dirName={path}
                    label={<OpenDirectoryLink path={path} name={path === '' ? '#' : pathWithoutEndedSlash}/>}
                    before={<DeleteDirectoryButton path={path} name={path}/>}
                />
                <Collapse in={isShowCollapse}>
                    <Box className={classes.content}>
                        {files.map((file) => <FileInfoRow
                                key={`${file.path}${file.name}`}
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
                        )}
                    </Box>
                </Collapse>
            </Box>

        </>
    )
}

export const SearchedFilesInfoList = ({filesMap}: SearchedFilesInfoListProps) => {
    return (
        <>
            {Object.keys(filesMap).map(path => <SearchedFilesInfoItem key={path} path={path} files={filesMap[path]}/>)}
        </>
    )
}