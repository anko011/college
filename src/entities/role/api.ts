import {GetServerSidePropsContext} from "next";
import {
    BackendResponse,
    fetcher,
    getBackendHTTPConfig,
    PaginatedData,
    withCheckData,
    withRisingError
} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {CreateRoleDto, Role, RoleWithPermissions, UpdateRoleDto} from "./types";
import {isRole, isRoleWithPermissions} from "./lib";

const {origin} = getBackendHTTPConfig()

const allRolesFetcher = async (req?: GetServerSidePropsContext['req']): Promise<BackendResponse<RoleWithPermissions[]>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/get-all-roles`
    return await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req));
}

export const fetchAllRoles = withCheckData(withRisingError(allRolesFetcher), isRoleWithPermissions)

const rolesFetcher = async (queries?: string, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<PaginatedData<Role>>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/get-roles?${queries}`
    return await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req));
}

export const fetchRoles = withCheckData(withRisingError(rolesFetcher), isRole)

const createRoleFetcher = async (createRoleDto: CreateRoleDto, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<RoleWithPermissions>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/create-role`
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
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/delete-role/${roleId}`
    return await fetcher(url, withAuthHeader({
        method: 'DELETE',
    }, req));
}

export const fetchDeleteRole = withRisingError(deleteRoleFetcher)

const updateRoleFetcher = async (updateRoleDto: UpdateRoleDto, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<RoleWithPermissions>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/update-role`
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


