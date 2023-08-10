import {ParsedUrlQuery} from "querystring";
import {SearchRoleDto} from "@/entities/role/types";
import {createObjectFromQuery} from "@/share/lib/queryService";

export const createSearchRoleDto = (query: ParsedUrlQuery): SearchRoleDto | undefined => {
    return createObjectFromQuery(query, ['name'])
}

export const createSearchRoleQueryString = (dto?: SearchRoleDto) => {
    if (!dto) return ''
    const params = new URLSearchParams(dto as Record<string, string>)
    return params.toString()
}