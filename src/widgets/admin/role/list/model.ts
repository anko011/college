import {ParsedUrlQuery} from "querystring";
import {getRolesListConfig} from "@/widgets/admin/role/list/config";
import {useUpdatePaginationQuery} from "@/share/client/hooks/useUpdatePaginationQuery";
import {getBackendMappedQuery} from "@/share/lib/queryService";

const {queryPageKey, queryLimitKey} = getRolesListConfig()

export const getPaginationRolesListQuery = (query: ParsedUrlQuery) => {
    let string = getBackendMappedQuery([
        {key: queryPageKey, backendKey: 'page'},
        {key: queryLimitKey, backendKey: 'size'}
    ], query)

    if (string === '') string = 'page=0'
    if (string.search('size') === -1) string += '&size=10'

    return string

}

export const useRolesListPagination = () => useUpdatePaginationQuery(queryPageKey, queryLimitKey)
