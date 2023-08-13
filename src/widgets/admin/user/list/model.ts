import {getUsersListConfig} from "@/widgets/admin/user/list/config";
import {useUpdatePaginationQuery} from "@/share/client/hooks/useUpdatePaginationQuery";
import {ParsedUrlQuery} from "querystring";
import {getBackendMappedQuery} from "@/share/lib/queryService";

const {queryPageKey, queryLimitKey} = getUsersListConfig()

export const useUsersListPagination = () => useUpdatePaginationQuery(queryPageKey, queryLimitKey)

export const getPaginationUsersListQuery = (query: ParsedUrlQuery) => {
    let string = getBackendMappedQuery([
        {key: queryPageKey, backendKey: 'page'},
        {key: queryLimitKey, backendKey: 'size'}
    ], query)

    if (string === '') string = 'page=0'
    if (string.search('size') === -1) string += '&size=10'

    return string
}
