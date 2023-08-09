import {ParsedUrlQuery} from "querystring";
import {getRoleConfig} from "@/entities/role/config";
import {getNumberFromQuery} from "@/share/lib/queryService";

const {queryPageKey} = getRoleConfig()

export const getRolesPageFromQuery = (query: ParsedUrlQuery) => {
    let page = getNumberFromQuery(query, queryPageKey)
    if (page && page < 0) page = 0
    return page ?? 0
}