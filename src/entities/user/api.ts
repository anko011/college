import {GetServerSidePropsContext, NextApiRequest} from "next";
import {createRequestCreatorByFetchSide, DataResponseNotOk, getBaseUrlByFetchSide} from "@/share/api";
import {CreateUserDto, UserWithRole} from "./types";


export const fetchAllUsers = async (req?: GetServerSidePropsContext['req']): Promise<DataResponseNotOk | UserWithRole[]> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/get-users`

    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    const response = await fetch(requestCreator(req))
    return response.json()
}


export const fetchCreateUser = async (dto: CreateUserDto, req?: NextApiRequest): Promise<DataResponseNotOk | UserWithRole> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/create-user`
    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const response = await fetch(requestCreator(req))
    return response.json()
}

export const fetchDeleteUser = async (userId: number, req?: NextApiRequest): Promise<DataResponseNotOk | undefined> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/delete-user/${userId}`
    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const response = await fetch(requestCreator(req))
    console.log(response.status)
    if (response.status === 200) return undefined
    return response.json()
}


