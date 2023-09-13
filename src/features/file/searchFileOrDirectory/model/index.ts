import {getBackendMappedQuery} from "@/share/lib/queryService";
import {ParsedUrlQuery} from "querystring";
import {useAppRouter} from "@/share/client/hooks";
import {getSearchFileOrDirectoryConfig} from "@/features/file/searchFileOrDirectory/config";

const {searchQuery, backendSearchQuery} = getSearchFileOrDirectoryConfig()

export const useSearchFilesQuery = () => {
    const router = useAppRouter()

    return {
        search(name: string) {
            router.updateQuery(searchQuery, name)
        },
        reset() {
            router.updateQuery(searchQuery, '')
        }
    }
}

export const getSearchFilesQuery = (query: ParsedUrlQuery) => getBackendMappedQuery([
    {backendKey: backendSearchQuery, key: searchQuery}
], query)