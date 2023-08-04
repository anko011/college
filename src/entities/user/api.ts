import {GetServerSidePropsContext, NextApiRequest} from "next";
import {BackendResponse, BodyWithMessage, getBackendHTTPConfig, getBaseUrlByFetchSide} from "@/share/lib/apiService";
import {CreateUserDto, UpdateUserDto, UserPage, UserWithRole} from "./types";
import {withAuthHeader} from "@/share/lib/authService";


const {origin} = getBackendHTTPConfig()


export const fetchUsers = async (page: number = 0, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<BodyWithMessage | UserPage>> => {
    const url = req ? `${origin}/admin/get-users?page=${page}` : '/api/admin/get-users'
    return await fetch(url, withAuthHeader({
        method: 'GET'
    }, req));
}

export const fetchCreateUser = async (dto: CreateUserDto, req?: NextApiRequest): Promise<BackendResponse<BodyWithMessage | UserWithRole>> => {
    const url = req ? `${origin}/admin/create-user` : '/api/admin/create-user'
    return await fetch(url, withAuthHeader(withAuthHeader({
        method: 'POST',
        body: JSON.stringify(dto),
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }, req)))
}

export const fetchUpdateUser = async (dto: UpdateUserDto, req?: NextApiRequest): Promise<BackendResponse<BodyWithMessage | UserWithRole>> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/update-user`
    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'PUT',
        body: JSON.stringify(dto),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return await fetch(requestCreator(req))
}

export const fetchDeleteUser = async (userId: number, req?: NextApiRequest): Promise<BackendResponse<BodyWithMessage>> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/delete-user/${userId}`
    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return await fetch(requestCreator(req))
}