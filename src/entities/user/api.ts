import {GetServerSidePropsContext, NextApiRequest} from "next";
import {
    BackendResponse,
    fetcher,
    getBackendHTTPConfig,
    PaginatedData,
    withCheckData,
    withRisingError
} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {CreateUserDto, UpdateUserDto, UserWithRole} from "./types";
import {isUserWithRole} from "./lib";

const {origin} = getBackendHTTPConfig()

const userFetcher = async (query?: string, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<PaginatedData<UserWithRole>>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/get-users?${query}`
    return await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req))
}

export const fetchUsers = withCheckData(withRisingError(userFetcher), isUserWithRole)


const createUserFetcher = async (dto: CreateUserDto, req?: NextApiRequest): Promise<BackendResponse<UserWithRole>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/create-user`
    return await fetcher(url, withAuthHeader({
        method: 'POST',
        body: JSON.stringify(dto),
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }, req))
}
export const fetchCreateUser = withCheckData(withRisingError(createUserFetcher), isUserWithRole)

const updateUserFetcher = async (dto: UpdateUserDto, req?: NextApiRequest): Promise<BackendResponse<UserWithRole>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/update-user`
    return await fetcher(url, withAuthHeader({
        method: 'PUT',
        body: JSON.stringify(dto),
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        }
    }, req))
}
export const fetchUpdateUser = withCheckData(withRisingError(updateUserFetcher), isUserWithRole)

const deleteUserFetcher = async (userId: number, req?: NextApiRequest): Promise<BackendResponse> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/admin/delete-user/${userId}`
    return await fetcher(url, withAuthHeader({
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }, req))
}

export const fetchDeleteUser = withRisingError(deleteUserFetcher)