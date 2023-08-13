import {ParsedUrlQuery} from "querystring";
import {useAppRouter} from "@/share/client/hooks";
import {getSearchRoleConfig} from "../config";
import {getBackendMappedQuery} from "@/share/lib/queryService";

const {searchQueryKey} = getSearchRoleConfig()

export const useQuerySearchRoles = () => {
    const router = useAppRouter()

    return {
        byName(name: string) {
            router.updateQuery(searchQueryKey, name)
        },
        reset() {
            router.updateQuery(searchQueryKey, '')
        }
    }
}

export const getSearchRolesQuery = (query: ParsedUrlQuery) => getBackendMappedQuery([
    {key: searchQueryKey, backendKey: 'name'}
], query)