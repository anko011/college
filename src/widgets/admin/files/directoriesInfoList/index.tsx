import {DirInfo} from "@/entities/files";
import {DirInfoRow} from "@/entities/files/client/admin";
import {DeleteDirectoryButton, OpenDirectoryLink} from "@/features/file";

interface DictionaryInfoListProps {
    directories: DirInfo[]
}

export const DirectoriesInfoList = ({directories}: DictionaryInfoListProps) => {
    return (
        <>
            {directories.map((dir) => (
                <DirInfoRow
                    key={`${dir.path}/${dir.name}`}
                    dirName={dir.name}
                    label={<OpenDirectoryLink path={`${dir.path}${dir.name}`} name={dir.name}/>}
                    before={<DeleteDirectoryButton path={`${dir.path}${dir.name}`} name={dir.name}/>}
                />
            ))}
        </>
    )
}