import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {withAdminLayout} from "@/widgets/admin";
import {Directory, DirectoryItem, fetchDirectory, File, FileItem} from "@/entities/files";
import {isDirectoryItem, isFileItem} from "@/entities/files/lib";
import {useAppRouter} from "@/share/client/hooks";
import {fetcher} from "@/share/lib/apiService";
import {useState} from "react";

export const getServerSideProps = appGetServerSideProps(async ({user, req}) => {
    const directoryData = await fetchDirectory(req)
    const directories = directoryData.filter(isDirectoryItem)
    const files = directoryData.filter(isFileItem)

    return {
        props: {user, directories, files}
    }
})


export const AdminFilesPage = (
    {
        files, directories
    }: {
        directories: DirectoryItem[],
        files: FileItem[]
    }) => {
    const router = useAppRouter()
    const [state, setState] = useState('')
    const handleOpenFile = async (file: FileItem) => {
        const response = await fetcher(`/api/files/download?filename=${file.name}`)
        const data = await response.blob()
        const reader = new FileReader()
        reader.readAsDataURL(data)
        const url = URL.createObjectURL(data)
        setState(url)
    }

    return (
        <>
            <a href={state} download>111111</a>
            {directories.map(directory => <Directory key={directory.path} directory={directory}/>)}
            {files.map(file => (
                <File
                    key={file.path}
                    file={file}
                    onClickTitle={handleOpenFile}
                />
            ))}
        </>
    )
}


export default withAdminLayout(AdminFilesPage)