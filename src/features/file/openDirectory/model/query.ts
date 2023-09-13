import {useAppRouter} from "@/share/client/hooks";
import {getOpenFolderConfig} from "@/features/file/openDirectory/config";
import {getBackendMappedQuery} from "@/share/lib/queryService";
import {ParsedUrlQuery} from "querystring";

const {openDirectoryQueryKey} = getOpenFolderConfig()

export const useOpenDirectory = () => {
    const router = useAppRouter()

    return {
        openByPath(path: string) {
            router.setQuery(openDirectoryQueryKey, `${path}`)
        }
    }
}

export const getOpenDirectoryQuery = (query: ParsedUrlQuery) => getBackendMappedQuery([
    {backendKey: 'path', key: openDirectoryQueryKey}
], query)