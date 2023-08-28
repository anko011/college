import {ParsedUrlQuery} from "querystring";
import {useUpdatePaginationQuery} from "@/share/client/hooks";
import {getBackendMappedQuery} from "@/share/lib/queryService";
import {getRolesListConfig} from "./config";

const {queryPageKey, queryLimitKey} = getRolesListConfig()

export const getPaginationRolesListQuery = (query: ParsedUrlQuery) => getBackendMappedQuery([
    {key: queryPageKey, backendKey: 'page'},
    {key: queryLimitKey, backendKey: 'size'}
], query)


export const useRolesListPagination = () => useUpdatePaginationQuery(queryPageKey, queryLimitKey)
