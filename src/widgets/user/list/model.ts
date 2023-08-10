import {ParsedUrlQuery} from "querystring";
import {getUsersListConfig} from "@/widgets/user/list/config";
import {getNumberFromQuery} from "@/share/lib/queryService";

const {queryPageKey} = getUsersListConfig()

export const getUsersPageFromQuery = (query: ParsedUrlQuery) => {
    let page = getNumberFromQuery(query, queryPageKey)
    if (page && page < 0) page = 0
    return page ?? 0
}
