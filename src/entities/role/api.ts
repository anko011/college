import {GetServerSidePropsContext} from "next";
import {BackendResponse, fetcher, getBackendHTTPConfig, withCheckData, withRisingError} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {CreateRoleDto, RolesPage, RoleWithPermissions, SearchRoleDto, UpdateRoleDto} from "./types";
import {isRolePage, isRoleWithPermissions} from "./lib";
import {createSearchRoleQueryString} from "@/entities/role/model";

const {origin} = getBackendHTTPConfig()

const rolesFetcher = async (page: number = 1, searchDto?: SearchRoleDto, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<RolesPage>> => {
    const searchQuery = createSearchRoleQueryString(searchDto)
    const url = req ? `${origin}/admin/get-roles?page=${page}&${searchQuery}` : `/api/admin/get-roles?page=${page}&${searchQuery}`
    return await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req));
}

export const fetchRoles = withCheckData(withRisingError(rolesFetcher), isRolePage)

const createRoleFetcher = async (createRoleDto: CreateRoleDto, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<RoleWithPermissions>> => {
    const url = req ? `${origin}/admin/create-role` : `/api/admin/create-role`
    return await fetcher(url, withAuthHeader({
        method: 'POST',
        body: JSON.stringify(createRoleDto),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }, req));
}

export const fetchCreateRole = withCheckData(withRisingError(createRoleFetcher), isRoleWithPermissions)

const deleteRoleFetcher = async (roleId: number, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<{}>> => {
    const url = req ? `${origin}/admin/delete-role/${roleId}` : `/api/admin/delete-role/${roleId}`
    return await fetcher(url, withAuthHeader({
        method: 'DELETE',
    }, req));
}

export const fetchDeleteRole = withRisingError(deleteRoleFetcher)

const updateRoleFetcher = async (updateRoleDto: UpdateRoleDto, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<RoleWithPermissions>> => {
    const url = req ? `${origin}/admin/update-role` : `/api/admin/update-role`
    return await fetcher(url, withAuthHeader({
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateRoleDto)
    }, req));
}

export const fetchUpdateRole = withCheckData(withRisingError(updateRoleFetcher), isRoleWithPermissions)


