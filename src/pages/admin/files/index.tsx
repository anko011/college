import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {withAdminLayout} from "@/widgets/admin";
import {useUser} from "@/entities/user/client";
import {fetchFiles, fetchIsAuthorizedYandex, FileInfo, FileItemInfo, isDirInfo, isFileInfo} from "@/entities/files";
import {
    CreateDirectoryButton,
    getOpenDirectoryQuery,
    getSearchFileOrDirectoryConfig,
    OpenDirectoryBreadcrumbs,
    SearchFileOrDirectoryInput
} from "@/features/file";
import {ParsedUrlQuery} from "querystring";
import {Alert, Anchor, Divider, Group, Stack, Text, Title} from "@mantine/core";
import {IconAlertCircle} from "@tabler/icons-react";
import {useState} from "react";
import NextLink from "next/link";
import {UploadMultiFilesButton} from "@/features/file/uploadFile/ui/uploadMultiFilesButton";
import {getSearchFilesQuery} from "@/features/file/searchFileOrDirectory/model";
import {DirectoriesInfoList, FilesInfoList, SearchedFilesInfoList} from "@/widgets/admin/files";

const {backendSearchQuery} = getSearchFileOrDirectoryConfig()

const parseFilesQueries = (query: ParsedUrlQuery) => {
    const searchDirectory = getSearchFilesQuery(query)
    if (searchDirectory === '') return getOpenDirectoryQuery(query)
    return searchDirectory
}

export const getServerSideProps = appGetServerSideProps(async ({user, req, query}) => {
    if (!user) return {
        redirect: {
            destination: '/admin'
        }
    }

    const authResponse = await fetchIsAuthorizedYandex(user.id, req)
    const isUserAuthorizedInYandex = (await authResponse.json()).status

    const filesQuery = parseFilesQueries(query)
    const fileItems = await fetchFiles(filesQuery, req)

    const params = new URLSearchParams(filesQuery)
    const currentDirPath = params.get('path')
    const searchParams = params.get(backendSearchQuery)

    const isSearchMode = searchParams !== null && searchParams !== ''


    return {
        props: {user, isUserAuthorizedInYandex, fileItems, currentDirPath, isSearchMode}
    }
})


export const AdminFilesPage = ({isUserAuthorizedInYandex, fileItems, currentDirPath, isSearchMode}: {
    isUserAuthorizedInYandex: boolean,
    fileItems: FileItemInfo[],
    currentDirPath: string | null,
    isSearchMode: boolean
}) => {
    const user = useUser()

    const [isOpenAlert, setIsOpenAlert] = useState(!isUserAuthorizedInYandex)


    const handleCloseAlert = () => setIsOpenAlert(false)

    const directories = fileItems.filter(isDirInfo)
    const files = fileItems.filter(isFileInfo)

    const filesMap: { [key: string]: FileInfo[] } = {}

    if (isSearchMode) {
        files.forEach((file) => {
            if (file.path in filesMap) {
                filesMap[file.path] = [...filesMap[file.path], file]
            } else {
                filesMap[file.path] = [file]
            }
        })
    }

    return (
        <>
            {isSearchMode}
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

            {currentDirPath && <OpenDirectoryBreadcrumbs currentDirPath={currentDirPath}/>}

            {(currentDirPath || isOpenAlert) && <Divider my="xs"/>}

            <Group mb="xs" position="apart">
                <Group>
                    <UploadMultiFilesButton currentPathDir={currentDirPath ?? ''}/>
                    <CreateDirectoryButton currentDirPath={currentDirPath ?? ''}/>
                </Group>
                {!currentDirPath && <SearchFileOrDirectoryInput/>}
            </Group>

            <Divider my="xs"/>

            <Stack spacing="xs">
                {isSearchMode && directories.length !== 0 && <Title order={4}>Найденные папки:</Title>}
                <DirectoriesInfoList directories={directories}/>

                {isSearchMode
                    ? Object.keys(filesMap).length !== 0 && (
                    <>
                        <Title order={4}>Найденные файлы:</Title>
                        <SearchedFilesInfoList filesMap={filesMap}/>
                    </>
                )
                    : <FilesInfoList files={files}/>
                }

                {isSearchMode && Object.keys(filesMap).length === 0 && directories.length === 0 && (
                    <>
                        <Text>Ничего не найдено...</Text>
                    </>
                )}
            </Stack>
        </>
    )
}


export default withAdminLayout(AdminFilesPage)
