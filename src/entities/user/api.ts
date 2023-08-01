import {GetServerSidePropsContext, NextApiRequest} from "next";
import {createRequestCreatorByFetchSide, DataResponseNotOk, getBaseUrlByFetchSide} from "@/share/api";
import {CreateUserDto, User} from "./types";


export const fetchAllUsers = async (req?: GetServerSidePropsContext['req']): Promise<DataResponseNotOk | User[]> => {
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


export const fetchCreateUser = async (dto: CreateUserDto, req?: NextApiRequest): Promise<DataResponseNotOk | User> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/create-user`

    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: {
            Accept: 'application/json'
        }
    })

    const response = await fetch(requestCreator(req))
    return response.json()
}

export const fetchDeleteUser = async (userId: number, req?: NextApiRequest): Promise<DataResponseNotOk | never> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/delete-user`

    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'DELETE'
    })

    const response = await fetch(requestCreator(req))
    return response.json()
}


