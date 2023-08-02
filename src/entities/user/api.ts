import {GetServerSidePropsContext, NextApiRequest} from "next";
import {BackendResponse, BodyWithMessage, createRequestCreatorByFetchSide, getBaseUrlByFetchSide} from "@/share/api";
import {CreateUserDto, UpdateUserDto, UserWithRole} from "./types";


export const fetchUsers = async (page: number = 0, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<BodyWithMessage | UserWithRole[]>> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/get-users?page=${page}`

    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    return await fetch(requestCreator(req))

}

export const fetchCreateUser = async (dto: CreateUserDto, req?: NextApiRequest): Promise<BackendResponse<BodyWithMessage | UserWithRole>> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/create-user`
    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return await fetch(requestCreator(req))
}

export const fetchUpdateUser = async (dto: UpdateUserDto, req?: NextApiRequest): Promise<BackendResponse<BodyWithMessage | UserWithRole>> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/update-user`
    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'POST',
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