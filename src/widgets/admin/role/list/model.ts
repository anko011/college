import {ParsedUrlQuery} from "querystring";
import {getNumberFromQuery} from "@/share/lib/queryService";
import {getRolesListConfig} from "@/widgets/admin/role/list/config";

const {queryPageKey} = getRolesListConfig()

export const getRolesPageFromQuery = (query: ParsedUrlQuery) => {
    let page = getNumberFromQuery(query, queryPageKey)
    if (page && page < 0) page = 0
    return page ?? 0
}