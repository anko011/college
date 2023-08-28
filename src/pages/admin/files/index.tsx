import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {withAdminLayout} from "@/widgets/admin";
import {useUser} from "@/entities/user/client";
import {fetchFiles, fetchIsAuthorizedYandex, FileItemInfo, isDirInfo, isFileInfo} from "@/entities/files";
import {DirInfoRow, FileInfoRow} from "@/entities/files/client/admin";
import {
    DeleteFileButton,
    DownloadFileButton,
    getOpenDirectoryQuery,
    OpenDirectoryLink,
    OpenFileLink,
    UploadMultiFilesInput
} from "@/features/file";
import {ParsedUrlQuery} from "querystring";
import {Alert, Anchor, Button, Divider, Group, ScrollArea, Stack} from "@mantine/core";
import {useAppRouter} from "@/share/client/hooks";
import {IconAlertCircle} from "@tabler/icons-react";
import {useState} from "react";
import NextLink from "next/link";


const parseFilesQueries = (query: ParsedUrlQuery) => {
    return getOpenDirectoryQuery(query)
}

export const getServerSideProps = appGetServerSideProps(async ({user, req, query}) => {
    if (!user) return {
        redirect: {
            destination: '/admin'
        }
    }

    const isUserAuthorizedInYandex = await fetchIsAuthorizedYandex(user.id, req)

    const filesQuery = parseFilesQueries(query)
    const fileItems = await fetchFiles(filesQuery, req)

    const isRootDirectory = filesQuery.length === 0

    return {
        props: {user, isUserAuthorizedInYandex, fileItems, isRootDirectory}
    }
})


export const AdminFilesPage = ({isUserAuthorizedInYandex, fileItems, isRootDirectory}: {
    isUserAuthorizedInYandex: boolean,
    fileItems: FileItemInfo[],
    isRootDirectory: boolean
}) => {
    const user = useUser()
    const router = useAppRouter()

    const [isOpenAlert, setIsOpenAlert] = useState(!isUserAuthorizedInYandex)

    const handleToYandex = (path: string, name: string) => async () => {
        const query = path === '' ? name : `${path}/${name}`
        const response = await fetch(`/api/yandex-disk/upload-to-yandex?path=${query}`, {
            method: 'POST'
        })
        alert(await response.text())
    }

    const handleBackDirectory = () => {
        router.back()
    }

    const handleCloseAlert = () => {
        setIsOpenAlert(false)
    }

    const directories = fileItems.filter(isDirInfo)
    const files = fileItems.filter(isFileInfo)

    return (
        <>

            {isOpenAlert && !isUserAuthorizedInYandex && (
                <Alert
                    icon={<IconAlertCircle size="1rem"/>}
                    title="Внимание!"
                    color="red"
                    withCloseButton
                    onClose={handleCloseAlert}
                >
                    Для данного аккаунта отсутствует токен регистрации в системе Yandex Disk. Для получения
                    возможности отправлять файлы на Yandex Disk авторизуйте аккаунт: {' '}
                    <Anchor
                        component={NextLink}
                        href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=b2b0764ee7784ac995a008244dacd2f2&force_confirm=yes&state=${user?.id}`}
                    >
                        Авторизоваться
                    </Anchor>
                </Alert>)
            }

            {!isRootDirectory && <Button mt="xs" onClick={handleBackDirectory}>Назад</Button>}

            {(!isRootDirectory || isOpenAlert) && <Divider my="xs"/>}

            <UploadMultiFilesInput/>

            <ScrollArea>
                <Stack spacing="xs">
                    {directories.map((dir) => (
                        <DirInfoRow
                            key={`${dir.path}/${dir.name}`}
                            dir={dir}
                            label={<OpenDirectoryLink dir={dir}/>}
                        />
                    ))}

                    {files.map((file) => (
                        <FileInfoRow
                            key={`${file.path}/${file.name}`}
                            file={file}
                            label={<OpenFileLink file={file}/>}
                            before={(
                                <Group>
                                    <DownloadFileButton file={file}/>
                                    <DeleteFileButton file={file}/>
                                </Group>
                            )}
                        />
                    ))}
                </Stack>
            </ScrollArea>
        </>
    )
}


export default withAdminLayout(AdminFilesPage)