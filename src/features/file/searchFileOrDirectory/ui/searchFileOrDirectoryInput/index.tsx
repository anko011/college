import {ActionIcon, Loader, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {ChangeEventHandler, useState} from "react";
import {useSearchFilesQuery} from "@/features/file/searchFileOrDirectory/model";

export const SearchFileOrDirectoryInput = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const {search, reset} = useSearchFilesQuery()

    const handleClickSearch = () => {
        if (searchValue === '') {
            reset()
            return
        }
        setIsLoading(true)
        search(searchValue)
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <TextInput
            value={searchValue}
            onChange={handleChange}
            placeholder="Поиск папок и файлов"
            rightSection={isLoading
                ? <Loader size="xs"/>
                : <ActionIcon color="blue" onClick={handleClickSearch}><IconSearch/></ActionIcon>}
        />
    )
}