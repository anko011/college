import {getUsersListConfig} from "@/widgets/admin/user/list/config";
import {useQueryPagination} from "@/share/client/hooks";
import {ParsedUrlQuery} from "querystring";
import {getBackendMappedQuery} from "@/share/lib/queryService";

const {queryPageKey, queryLimitKey} = getUsersListConfig()

export const useUsersListPagination = () => useQueryPagination(queryPageKey, queryLimitKey)

export const getPaginationUsersListQuery = (query: ParsedUrlQuery) => getBackendMappedQuery([
    {key: queryPageKey, backendKey: 'page'},
    {key: queryLimitKey, backendKey: 'size'}
], query)

