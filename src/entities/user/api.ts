import {GetServerSidePropsContext, NextApiRequest} from "next";
import {
    BackendResponse,
    BodyWithMessage,
    fetcher,
    getBackendHTTPConfig,
    withCheckData,
    withRisingError
} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {CreateUserDto, SearchUserDto, UpdateUserDto, UserPage, UserWithRole} from "./types";
import {isUserPage, isUserWithRole} from "@/entities/user/lib";
import {createSearchUserQueryString} from "@/entities/user/model";

const {origin} = getBackendHTTPConfig()

const userFetcher = async (page: number = 0, limitUsers: number = 10, searchDto?: SearchUserDto, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<UserPage>> => {
    const searchQuery = createSearchUserQueryString(searchDto)
    const url = req ? `${origin}/admin/get-users?page=${page}&${searchQuery}&limit=${limitUsers}` : `/api/admin/get-users?page=${page}&${searchQuery}&limit=${limitUsers}`
    return await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req))
}

export const fetchUsers = withCheckData(withRisingError(userFetcher), isUserPage)


const createUserFetcher = async (dto: CreateUserDto, req?: NextApiRequest): Promise<BackendResponse<UserWithRole>> => {
    const url = req ? `${origin}/admin/create-user` : '/api/admin/create-user'
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
    const url = req ? `${origin}/admin/update-user` : '/api/admin/update-user'
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

const deleteUserFetcher = async (userId: number, req?: NextApiRequest): Promise<BackendResponse<BodyWithMessage>> => {
    const url = req ? `${origin}/admin/delete-user/${userId}` : `/api/admin/delete-user/${userId}`
    return await fetcher(url, withAuthHeader({
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }, req))
}

export const fetchDeleteUser = withRisingError(deleteUserFetcher)